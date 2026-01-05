'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { SignJWT } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'default_secret_key_change_me'
)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function login(prevState: any, formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!email || !password) {
        return { error: 'Email and password are required' }
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email },
        })

        if (!user) {
            return { error: 'Invalid credentials' }
        }

        const isValid = await bcrypt.compare(password, user.password)

        // DEVELOPMENT FALLBACK: If bcrypt compare fails, allow login with the seeded plaintext password
        // This is ONLY enabled in non-production to make local development predictable when the DB
        // password may have been changed. Do NOT enable in production.
        const devSeedPassword = process.env.DEV_ADMIN_PASSWORD || 'password123'
        const isDevSeed = process.env.NODE_ENV !== 'production' && user.email === 'admin@transport.com' && password === devSeedPassword

        if (!isValid && !isDevSeed) {
            return { error: 'Invalid credentials' }
        }

        // Create session (simple JWT in cookie)
        const token = await new SignJWT({ userId: user.id, role: user.role })
            .setProtectedHeader({ alg: 'HS256' })
            .setExpirationTime('24h')
            .sign(JWT_SECRET)

        // Await the cookie store
        const cookieStore = await cookies()
        cookieStore.set('session', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
        })

    } catch (error) {
        console.error('Login error:', error)
        return { error: 'Something went wrong. Please try again.' }
    }

    redirect('/dashboard')
}

export async function logout() {
    const cookieStore = await cookies()
    cookieStore.delete('session')
    redirect('/login')
}

// Request a password reset link (development: logs link to server console)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function requestPasswordReset(prevState: any, formData: FormData) {
    const email = formData.get('email') as string

    if (!email) {
        return { error: 'Email is required' }
    }

    try {
        const user = await prisma.user.findUnique({ where: { email } })

        // Do not reveal whether account exists
        if (!user) {
            console.log(`Password reset requested for non-existing email: ${email}`)
            return { message: 'If an account exists, a password reset link has been sent.' }
        }

        const token = crypto.randomBytes(32).toString('hex')
        const expires = new Date(Date.now() + 1000 * 60 * 60) // 1 hour

        await prisma.user.update({ where: { email }, data: { resetToken: token, resetTokenExpires: expires } })

        const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/login/reset/${token}`

        // In production: send an email. For now we log the link for development.
        console.log(`Password reset link for ${email}: ${resetUrl}`)

        return { message: 'If an account exists, a password reset link has been sent.' }
    } catch (error) {
        console.error('requestPasswordReset error:', error)
        return { error: 'Something went wrong. Please try again.' }
    }
}

// Reset password using token
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function resetPassword(prevState: any, formData: FormData) {
    const token = formData.get('token') as string
    const password = formData.get('password') as string
    const confirm = formData.get('confirm') as string

    if (!token || !password || !confirm) {
        return { error: 'All fields are required' }
    }

    if (password !== confirm) {
        return { error: 'Passwords do not match' }
    }

    if (password.length < 6) {
        return { error: 'Password must be at least 6 characters' }
    }

    try {
        const user = await prisma.user.findFirst({ where: { resetToken: token } as any })
        const u = user as any

        if (!u || !u.resetTokenExpires || u.resetTokenExpires < new Date()) {
            return { error: 'Invalid or expired token' }
        }

        const hashed = await bcrypt.hash(password, 10)

        await prisma.user.update({ where: { id: u.id }, data: { password: hashed, resetToken: null, resetTokenExpires: null } as any })

        return { message: 'Password has been reset. You can now sign in.' }
    } catch (error) {
        console.error('resetPassword error:', error)
        return { error: 'Something went wrong. Please try again.' }
    }
}
