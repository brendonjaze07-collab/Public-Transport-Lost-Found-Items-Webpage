
import prisma from '@/lib/prisma';
import Link from 'next/link';

export default async function SearchPage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string; category?: string }>
}) {
    const { q, category } = await searchParams;

    const items = await prisma.foundItem.findMany({
        where: {
            status: 'FOUND', // Only show found items
            ...(q ? {
                OR: [
                    { name: { contains: q } },
                    { description: { contains: q } },
                    { locationFound: { contains: q } },
                ]
            } : {}),
            ...(category ? { category } : {}),
        },
        orderBy: { dateFound: 'desc' },
    });

    return (
        <div className="container" style={{ padding: '2rem 1rem' }}>
            <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
                <h1 className="text-gradient h1" style={{ marginBottom: '0.5rem' }}>Search Found Items</h1>
                <p style={{ color: 'hsl(var(--color-text-secondary))', fontSize: '1.1rem' }}>Find lost items reported by terminals and staff.</p>
            </div>

            {/* Search Controls */}
            <form style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <div style={{ flex: '1 1 300px', maxWidth: '500px' }}>
                    <input
                        name="q"
                        defaultValue={q}
                        placeholder="Search by name, description, or location..."
                    />
                </div>
                <div style={{ flex: '1 1 200px', maxWidth: '250px' }}>
                    <select
                        name="category"
                        defaultValue={category || ""}
                    >
                        <option value="">All Categories</option>
                        <option value="electronics">Electronics</option>
                        <option value="documents">Documents/IDs</option>
                        <option value="clothing">Clothing</option>
                        <option value="bags">Bags/Wallets</option>
                        <option value="others">Others</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary" style={{ flex: '0 0 auto', minWidth: '120px' }}>Search</button>
            </form>

            {/* Results Grid */}
            {items.length === 0 ? (
                <div className="card" style={{ textAlign: 'center', padding: '4rem 1rem', color: 'hsl(var(--color-text-secondary))' }}>
                    <p style={{ fontSize: '1.25rem' }}>No items found matching your search.</p>
                </div>
            ) : (
                <div className="grid-auto-fit">
                    {items.map(item => (
                        <div key={item.id} className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ height: '220px', backgroundColor: 'hsl(var(--color-surface-hover))', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid hsl(var(--color-border))' }}>
                                {item.imageUrl ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={item.imageUrl} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <div style={{ textAlign: 'center' }}>
                                        <span style={{ fontSize: '3rem', display: 'block' }}>📦</span>
                                        <span style={{ color: 'hsl(var(--color-text-secondary))', fontSize: '0.875rem' }}>No Image</span>
                                    </div>
                                )}
                            </div>
                            <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', alignItems: 'center' }}>
                                    <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700, color: 'hsl(var(--color-primary))', backgroundColor: 'hsla(var(--color-primary), 0.1)', padding: '0.2rem 0.5rem', borderRadius: 'var(--radius-sm)' }}>{item.category}</span>
                                    <span style={{ fontSize: '0.75rem', color: 'hsl(var(--color-text-secondary))' }}>{new Date(item.dateFound).toLocaleDateString()}</span>
                                </div>
                                <h3 className="h3" style={{ marginBottom: '0.75rem' }}>{item.name}</h3>
                                <p style={{ color: 'hsl(var(--color-text-secondary))', fontSize: '0.9rem', marginBottom: '1.25rem', flex: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.description}</p>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'hsl(var(--color-text-primary))', marginBottom: '1.5rem' }}>
                                    <span style={{ filter: 'grayscale(1)' }}>📍</span>
                                    <span style={{ fontWeight: 500 }}>{item.locationFound}</span>
                                </div>

                                <Link href={`/claim/${item.id}`} className="btn btn-primary" style={{ width: '100%' }}>
                                    View Details & Claim
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
