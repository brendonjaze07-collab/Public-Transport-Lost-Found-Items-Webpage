'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { requestPasswordReset } from '../../actions/auth';

export default function ForgotPasswordPage() {
    // cast action to any to satisfy useActionState's overload typing
    const [state, formAction, isPending] = useActionState(requestPasswordReset as unknown as any, { message: '', error: '' });

    return (
        <div className="container" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
            <div className="card" style={{ width: '100%', maxWidth: '450px', padding: '2.5rem 1.5rem' }}>
                <h1 className="text-gradient h2" style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Forgot Password</h1>

                {state?.message && (
                    <div style={{
                        backgroundColor: 'hsl(var(--color-success))',
                        color: 'white',
                        padding: '0.75rem',
                        borderRadius: 'var(--radius-sm)',
                        marginBottom: '1.5rem',
                        textAlign: 'center',
                    }}>
                        {state.message}
                    </div>
                )}

                {state?.error && (
                    <div style={{
                        backgroundColor: 'hsl(var(--color-error))',
                        color: 'white',
                        padding: '0.75rem',
                        borderRadius: 'var(--radius-sm)',
                        marginBottom: '1.5rem',
                        textAlign: 'center',
                    }}>
                        {state.error}
                    </div>
                )}

                <form action={formAction} style={{ display: 'grid', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Email Address</label>
                        <input
                            name="email"
                            type="email"
                            required
                            placeholder="admin@transport.com"
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isPending}
                        style={{ width: '100%', marginTop: '0.5rem', padding: '1rem' }}
                    >
                        {isPending ? 'Sending...' : 'Send reset link'}
                    </button>
                </form>

                <p style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem', color: 'hsl(var(--color-text-secondary))' }}>
                    Remembered your password? <Link href="/login" style={{ color: 'hsl(var(--color-primary))', fontWeight: 600 }}>Sign in</Link>
                </p>
            </div>
        </div>
    );
}
