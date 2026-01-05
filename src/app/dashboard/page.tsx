
import Link from 'next/link';
import prisma from '@/lib/prisma';

export default async function DashboardPage() {
    const recentReportsCount = await prisma.foundItem.count();
    const pendingClaimsCount = await prisma.claimRequest.count({
        where: { status: 'PENDING' }
    });
    const itemsReturnedCount = await prisma.foundItem.count({
        where: { status: 'CLAIMED' }
    });

    return (
        <div className="container" style={{ padding: '2rem 1rem' }}>
            <div style={{ marginBottom: '2.5rem' }}>
                <h1 className="text-gradient h1" style={{ marginBottom: '0.5rem' }}>Admin Dashboard</h1>
                <p style={{ color: 'hsl(var(--color-text-secondary))', fontSize: '1.1rem' }}>Welcome back, Administrator.</p>
            </div>

            <div className="grid-auto-fit">
                <div className="card" style={{ textAlign: 'center' }}>
                    <h3 className="h3" style={{ marginBottom: '1rem', color: 'hsl(var(--color-text-secondary))', fontWeight: 500 }}>Recent Reports</h3>
                    <p style={{ fontSize: '3rem', fontWeight: 800, color: 'hsl(var(--color-primary))' }}>{recentReportsCount}</p>
                </div>
                <div className="card" style={{ textAlign: 'center' }}>
                    <h3 className="h3" style={{ marginBottom: '1rem', color: 'hsl(var(--color-text-secondary))', fontWeight: 500 }}>Pending Claims</h3>
                    <p style={{ fontSize: '3rem', fontWeight: 800, color: 'hsl(var(--color-warning))' }}>{pendingClaimsCount}</p>
                </div>
                <div className="card" style={{ textAlign: 'center' }}>
                    <h3 className="h3" style={{ marginBottom: '1rem', color: 'hsl(var(--color-text-secondary))', fontWeight: 500 }}>Items Returned</h3>
                    <p style={{ fontSize: '3rem', fontWeight: 800, color: 'hsl(var(--color-success))' }}>{itemsReturnedCount}</p>
                </div>
            </div>

            <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link href="/dashboard/items" className="btn btn-primary" style={{ flex: '1 1 200px' }}>Manage Items</Link>
                <Link href="/" className="btn" style={{ flex: '1 1 200px', border: '1px solid hsl(var(--color-border))' }}>Back to Home</Link>
            </div>
        </div>
    );
}
