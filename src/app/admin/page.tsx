import { getPosts } from "@/services/post";

export default async function AdminDashboard() {
  const { data: posts } = await getPosts(1, "", 20);

  return (
    <div className="container animate-up" style={{ padding: '6rem 0' }}>
      <header style={{ marginBottom: '5rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1.25rem', color: '#000000' }}>
          Administration
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
          Monitor network activities, manage articles, and ensure a healthy community environment.
        </p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginBottom: '6rem' }}>
        <div style={{ padding: '2.5rem', textAlign: 'center', background: '#ffffff', border: '1px solid var(--border)', borderRadius: '16px' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.25rem', color: '#000000' }}>{posts?.length || 0}</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8125rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total articles</p>
        </div>
        <div style={{ padding: '2.5rem', textAlign: 'center', background: '#ffffff', border: '1px solid var(--border)', borderRadius: '16px' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.25rem', color: '#000000' }}>{posts?.reduce((acc: number, p: any) => acc + (p.comments?.length || 0), 0) || 0}</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8125rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Active discussions</p>
        </div>
        <div style={{ padding: '2.5rem', textAlign: 'center', background: '#ffffff', border: '1px solid var(--border)', borderRadius: '16px' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.25rem', color: '#10b981' }}>3</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8125rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Verified authors</p>
        </div>
      </div>

      <section style={{ padding: '3rem', background: '#ffffff', border: '1px solid var(--border)', borderRadius: '16px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '2rem', color: '#000000' }}>Content audit</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: '1rem' }}>Title</th>
                <th style={{ padding: '1rem' }}>Author</th>
                <th style={{ padding: '1rem' }}>Comments</th>
                <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts?.map((post: any) => (
                <tr key={post.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '1.25rem 1rem', fontWeight: 600, color: '#000000', fontSize: '0.9375rem' }}>{post.title}</td>
                  <td style={{ padding: '1.25rem 1rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>{post.profiles?.name}</td>
                  <td style={{ padding: '1.25rem 1rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>{post.comments?.length || 0}</td>
                  <td style={{ padding: '1.25rem 1rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                      <button className="btn btn-glass" style={{ padding: '0.5rem 1rem', fontSize: '0.75rem' }}>Edit</button>
                      <button className="btn btn-glass" style={{ padding: '0.5rem 1rem', fontSize: '0.75rem', color: '#ef4444' }}>Remove</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

