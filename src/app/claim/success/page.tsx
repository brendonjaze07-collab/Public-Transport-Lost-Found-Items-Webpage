
import Link from 'next/link';

export default function ClaimSuccessPage() {
    return (
        <div className="container" style={{ padding: '4rem 1.5rem', textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div className="card" style={{ maxWidth: '500px', padding: '3rem' }}>
                <div style={{ width: '80px', height: '80px', background: 'hsl(var(--color-success))', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </div>
                <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }} className="text-gradient">Claim Submitted!</h1>
                <p style={{ color: 'hsl(var(--color-text-secondary))', marginBottom: '2rem' }}>
                    Your claim request has been received. Our staff will review your details and contact you shortly for verification.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <Link href="/search" className="btn" style={{ border: '1px solid hsl(var(--color-border))' }}>Search More</Link>
                    <Link href="/" className="btn btn-primary">Return Home</Link>
                </div>
            </div>
        </div>
    );
}
