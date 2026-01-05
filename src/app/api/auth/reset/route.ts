import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const token = body?.token
    const password = body?.password

    if (!token || !password) {
      return NextResponse.json({ error: 'token and password required' }, { status: 400 })
    }

    const user = await prisma.user.findFirst({ where: { resetToken: token } as any })
    const u = user as any
    const expires = u?.resetTokenExpires as Date | undefined

    if (!u || !expires || expires < new Date()) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 })
    }

    const hashed = await bcrypt.hash(password, 10)
    await prisma.user.update({ where: { id: u.id }, data: { password: hashed, resetToken: null, resetTokenExpires: null } as any })

    return NextResponse.json({ message: 'Password reset successful' })
  } catch (error) {
    console.error('API reset error', error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
