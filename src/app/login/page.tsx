
'use client';

import { useActionState, useState } from 'react';
import { login } from '../actions/auth';
import Link from 'next/link';

const initialState = {
    error: '',
};

export default function LoginPage() {
    const [state, formAction, isPending] = useActionState(login, initialState);

    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="container" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
            <div className="card" style={{ width: '100%', maxWidth: '450px', padding: '2.5rem 1.5rem' }}>
                <h1 className="text-gradient h2" style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Admin Login</h1>

                {state?.error && (
                    <div className="alert">
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

                    <div className="password-wrapper">
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Password</label>
                        <div className="input-with-toggle">
                            <input
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                required
                                placeholder="••••••••"
                            />

                            <button
                                type="button"
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                                onClick={() => setShowPassword(s => !s)}
                                className="password-toggle"
                            >
                                {showPassword ? (
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                                        <path d="M3 3l18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M10.58 10.58a3 3 0 0 0 4.84 4.84" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M9.88 5.15A10.94 10.94 0 0 0 3 12c2.5 4 6.5 7 9 7 1.1 0 2.17-.35 3.16-.97" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                ) : (
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                                        <path d="M1.5 12s4.5-7.5 10.5-7.5S22.5 12 22.5 12s-4.5 7.5-10.5 7.5S1.5 12 1.5 12z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                        <Link href="/login/forgot" style={{ fontSize: '0.9rem', color: 'hsl(var(--color-primary))', fontWeight: 600 }}>Forgot password?</Link>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isPending}
                        style={{ width: '100%', marginTop: '0.5rem', padding: '1rem' }}
                    >
                        {isPending ? 'Logging in...' : 'Sign In'}
                    </button>
                </form>

                <p style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem', color: 'hsl(var(--color-text-secondary))' }}>
                    Don't have an account? <Link href="/" style={{ color: 'hsl(var(--color-primary))', fontWeight: 600 }}>Contact Admin</Link>
                </p>
            </div>
        </div>
    );
}
