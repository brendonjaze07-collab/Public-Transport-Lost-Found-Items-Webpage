
import Link from 'next/link';

export default function ReportSuccessPage() {
    return (
        <div className="container" style={{ padding: '2rem 1rem', minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div className="card" style={{ maxWidth: '500px', width: '100%', padding: '2.5rem 1.5rem', textAlign: 'center' }}>
                <div style={{ width: '80px', height: '80px', background: 'hsla(var(--color-success), 0.1)', color: 'hsl(var(--color-success))', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </div>
                <h1 className="text-gradient h1" style={{ marginBottom: '1rem' }}>Report Submitted!</h1>
                <p style={{ color: 'hsl(var(--color-text-secondary))', marginBottom: '2.5rem', fontSize: '1.1rem' }}>
                    Thank you for reporting this found item. It has been recorded in our system and is now available for searching.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link href="/report" className="btn" style={{ flex: '1 1 150px', border: '1px solid hsl(var(--color-border))' }}>Report Another</Link>
                    <Link href="/" className="btn btn-primary" style={{ flex: '1 1 150px' }}>Return Home</Link>
                </div>
            </div>
        </div>
    );
}
