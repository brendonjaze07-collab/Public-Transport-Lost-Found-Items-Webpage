import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const cookieStore = await cookies();
    const session = cookieStore.get('session');

    if (!session) {
        redirect('/login');
    }

    return (
        <>
            <nav style={{ background: 'hsl(var(--color-surface))', borderBottom: '1px solid hsl(var(--color-border))', padding: '1rem 0' }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 700, fontSize: '1.25rem' }}>Admin Portal</span>
                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem' }}>
                        <span>Admin User</span>
                    </div>
                </div>
            </nav>
            {children}
        </>
    );
}
