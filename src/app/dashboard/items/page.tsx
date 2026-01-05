
import prisma from '@/lib/prisma';
import Link from 'next/link';
import { updateItemStatus, deleteItem } from '@/app/actions/item-admin';

export default async function AdminItemsPage() {
    const items = await prisma.foundItem.findMany({
        orderBy: { createdAt: 'desc' },
        include: { recordedBy: true }
    });

    return (
        <div className="container" style={{ padding: '2rem 1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <h1 className="text-gradient h2" style={{ margin: 0 }}>Manage Found Items</h1>
                <Link href="/dashboard" className="btn" style={{ border: '1px solid hsl(var(--color-border))', padding: '0.5rem 1rem' }}>Back to Dashboard</Link>
            </div>

            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
                        <thead style={{ backgroundColor: 'hsl(var(--color-surface-hover))', borderBottom: '1px solid hsl(var(--color-border))' }}>
                            <tr>
                                <th style={{ padding: '1rem', fontWeight: 600 }}>Item Name</th>
                                <th style={{ padding: '1rem', fontWeight: 600 }}>Category</th>
                                <th style={{ padding: '1rem', fontWeight: 600 }}>Date Found</th>
                                <th style={{ padding: '1rem', fontWeight: 600 }}>Location</th>
                                <th style={{ padding: '1rem', fontWeight: 600 }}>Status</th>
                                <th style={{ padding: '1rem', fontWeight: 600 }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.length === 0 ? (
                                <tr>
                                    <td colSpan={6} style={{ padding: '2rem', textAlign: 'center', color: 'hsl(var(--color-text-secondary))' }}>No items recorded yet.</td>
                                </tr>
                            ) : (
                                items.map(item => (
                                    <tr key={item.id} style={{ borderBottom: '1px solid hsl(var(--color-border))' }}>
                                        <td style={{ padding: '1rem' }}>{item.name}</td>
                                        <td style={{ padding: '1rem', textTransform: 'capitalize' }}>
                                            {item.category === 'bags' ? 'Bags/Wallet' : item.category}
                                        </td>
                                        <td style={{ padding: '1rem' }}>{new Date(item.dateFound).toLocaleDateString()}</td>
                                        <td style={{ padding: '1rem' }}>{item.locationFound}</td>
                                        <td style={{ padding: '1rem' }}>
                                            <span style={{
                                                padding: '0.25rem 0.5rem',
                                                borderRadius: 'var(--radius-sm)',
                                                fontSize: '0.75rem',
                                                fontWeight: 600,
                                                whiteSpace: 'nowrap',
                                                backgroundColor: item.status === 'FOUND' ? 'hsla(var(--color-primary), 0.1)' :
                                                    item.status === 'CLAIMED' ? 'hsla(var(--color-success), 0.1)' :
                                                        item.status === 'PENDING' ? 'hsla(var(--color-warning), 0.1)' : 'hsla(var(--color-text-secondary), 0.1)',
                                                color: item.status === 'FOUND' ? 'hsl(var(--color-primary))' :
                                                    item.status === 'CLAIMED' ? 'hsl(var(--color-success))' :
                                                        item.status === 'PENDING' ? 'hsl(var(--color-warning))' : 'hsl(var(--color-text-secondary))'
                                            }}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                <form action={async () => {
                                                    'use server';
                                                    await updateItemStatus(item.id, 'CLAIMED');
                                                }}>
                                                    <button className="btn" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', border: '1px solid hsl(var(--color-success))', color: 'hsl(var(--color-success))' }}>Mark Claimed</button>
                                                </form>
                                                <form action={deleteItem.bind(null, item.id)}>
                                                    <button className="btn" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', border: '1px solid hsl(var(--color-error))', color: 'hsl(var(--color-error))' }}>Delete</button>
                                                </form>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'hsl(var(--color-text-secondary))', textAlign: 'center', display: 'block' }} className="mobile-only">
                Scroll horizontally to view more details.
            </p>
        </div>
    );
}
