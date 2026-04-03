import CreatePostForm from "@/components/CreatePostForm";

export default function AuthorDashboard() {
  return (
    <div className="container animate-up" style={{ padding: '6rem 0' }}>
      <header style={{ marginBottom: '5rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1.25rem', color: '#000000' }}>Welcome to your dashboard</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
          Manage your presence on the network and create new articles with AI-powered insights.
        </p>
      </header>

      <CreatePostForm />

      <section style={{ marginTop: '6rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '2rem', color: '#000000' }}>Recent activity</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
          <div className="glass-card" style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)', background: '#ffffff', border: '1px solid var(--border)' }}>
            <p style={{ fontSize: '0.9375rem' }}>You haven't published any articles yet. Let's get started!</p>
          </div>
        </div>
      </section>
    </div>
  );
}

