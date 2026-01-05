
import prisma from '@/lib/prisma';
import ClaimForm from './claim-form';
import Link from 'next/link';

export default async function ClaimPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const item = await prisma.foundItem.findUnique({
        where: { id },
    });

    if (!item) {
        return (
            <div className="container" style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
                <h1 className="h1">Item Not Found</h1>
                <p>The item you are looking for does not exist or has been removed.</p>
                <Link href="/search" className="btn btn-primary" style={{ marginTop: '1rem' }}>Back to Search</Link>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '2rem 1rem', maxWidth: '800px' }}>
            <Link href="/search" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'hsl(var(--color-primary))', fontWeight: 600 }}>
                <span>←</span> Back to Search Results
            </Link>

            <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
                <div style={{ height: 'clamp(200px, 40vh, 400px)', backgroundColor: 'hsl(var(--color-surface-hover))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {item.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={item.imageUrl} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    ) : (
                        <div style={{ textAlign: 'center' }}>
                            <span style={{ fontSize: '4rem', display: 'block' }}>📦</span>
                            <span style={{ color: 'hsl(var(--color-text-secondary))' }}>No Image Available</span>
                        </div>
                    )}
                </div>

                <div style={{ padding: '1.5rem 1rem' }}>
                    <h1 className="h2" style={{ marginBottom: '0.5rem' }}>Claiming: {item.name}</h1>
                    <div style={{ display: 'flex', gap: '0.75rem', color: 'hsl(var(--color-text-secondary))', marginBottom: '2rem', fontSize: '0.875rem', flexWrap: 'wrap', alignItems: 'center' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>📅 {new Date(item.dateFound).toLocaleDateString()}</span>
                        <span className="desktop-only">•</span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>📍 {item.locationFound}</span>
                        <span className="desktop-only">•</span>
                        <span style={{ textTransform: 'capitalize', padding: '0.2rem 0.5rem', backgroundColor: 'hsl(var(--color-surface-hover))', borderRadius: 'var(--radius-sm)' }}>{item.category}</span>
                    </div>

                    <div style={{ borderTop: '1px solid hsl(var(--color-border))', paddingTop: '2rem' }}>
                        <h2 className="h3" style={{ marginBottom: '1.5rem' }}>Submit Verification Details</h2>
                        <ClaimForm item={item} />
                    </div>
                </div>
            </div>
        </div>
    );
}
