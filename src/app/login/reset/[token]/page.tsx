'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { resetPassword } from '../../../actions/auth';

export default function ResetPasswordPage({ params }: any) {
    // cast action to any to satisfy useActionState's overload typing
    const [state, formAction, isPending] = useActionState(resetPassword as unknown as any, { message: '', error: '' });
    const token = params?.token;

    return (
        <div className="container" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
            <div className="card" style={{ width: '100%', maxWidth: '450px', padding: '2.5rem 1.5rem' }}>
                <h1 className="text-gradient h2" style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Reset Password</h1>

                {state?.message && (
                    <div className="alert alert-success">
                        {state.message}
                    </div>
                )}

                {state?.error && (
                    <div className="alert">
                        {state.error}
                    </div>
                )} 

                <form action={formAction} style={{ display: 'grid', gap: '1.5rem' }}>
                    <input type="hidden" name="token" value={token} />

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>New Password</label>
                        <input name="password" type="password" required placeholder="••••••••" />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Confirm Password</label>
                        <input name="confirm" type="password" required placeholder="••••••••" />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isPending}
                        style={{ width: '100%', marginTop: '0.5rem', padding: '1rem' }}
                    >
                        {isPending ? 'Resetting...' : 'Reset Password'}
                    </button>
                </form>

                <p style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem', color: 'hsl(var(--color-text-secondary))' }}>
                    Remembered your password? <Link href="/login" style={{ color: 'hsl(var(--color-primary))', fontWeight: 600 }}>Sign in</Link>
                </p>
            </div>
        </div>
    );
}
