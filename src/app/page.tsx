import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <header className="container" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 style={{ fontWeight: 800, fontSize: '1.5rem' }}>
          <Link href="/">
            <span className="text-gradient">Lost&Found</span>
          </Link>
        </h1>
        <nav style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <Link href="/login" className="btn" style={{ color: 'hsl(var(--color-text-secondary))', padding: '0.5rem 1rem' }}>Admin Login</Link>
          <Link href="/report" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>Report Lost</Link>
        </nav>
      </header>

      <section className="container" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem 1rem' }}>
        <div style={{ maxWidth: '800px', width: '100%' }}>
          <h2 className="h1" style={{ marginBottom: '1.5rem' }}>
            Reuniting You with <br />
            <span className="text-gradient">What Matters Most</span>
          </h2>
          <p style={{ fontSize: 'clamp(1rem, 4vw, 1.25rem)', color: 'hsl(var(--color-text-secondary))', marginBottom: '2.5rem', maxWidth: '600px', marginInline: 'auto' }}>
            The centralized system for reporting and tracking items lost in public transport terminals. Secure, transparent, and easy to use.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/search" className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', width: '100%', maxWidth: '300px' }}>Search Items</Link>
          </div>
        </div>
      </section>

      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1, overflow: 'hidden', pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: 'clamp(300px, 50vw, 600px)', height: 'clamp(300px, 50vw, 600px)', background: 'radial-gradient(circle, hsla(var(--color-primary), 0.15) 0%, transparent 70%)', filter: 'blur(80px)' }}></div>
        <div style={{ position: 'absolute', bottom: '-10%', left: '-10%', width: 'clamp(300px, 50vw, 600px)', height: 'clamp(300px, 50vw, 600px)', background: 'radial-gradient(circle, hsla(var(--color-secondary), 0.1) 0%, transparent 70%)', filter: 'blur(80px)' }}></div>
      </div>
    </main>
  );
}
