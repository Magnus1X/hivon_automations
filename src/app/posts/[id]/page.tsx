import { getPostById } from "@/services/post";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";
import CommentSection from "@/components/CommentSection";
import { Sparkles, Calendar, BookOpen, User } from "lucide-react";
import Link from "next/link";

export default async function PostDetail({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  const post = await getPostById(id);

  if (!post) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '15rem 2rem' }}>
        <h1 style={{ fontSize: '6rem', fontWeight: 900, background: 'var(--linear-rainbow)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>404</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.5rem', marginBottom: '3rem' }}>Article missing from the network records.</p>
        <Link href="/posts" className="btn btn-primary" style={{ padding: '1rem 3rem', textDecoration: 'none' }}>Return to Feed</Link>
      </div>
    );
  }

  return (
    <article className="animate-up" style={{ paddingBottom: '10rem' }}>
      {/* Article Header */}
      <header style={{ position: 'relative', width: '100%', padding: '6rem 0 4rem', textAlign: 'center', borderBottom: '1px solid var(--border)', background: '#ffffff' }}>
        <div className="container">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.625rem', padding: '0.375rem 1rem', background: '#f8fafc', borderRadius: '100px', border: '1px solid var(--border)', marginBottom: '2rem', color: '#000000', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
             <BookOpen size={14} /> Insight
          </div>
          
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '2rem', lineHeight: 1.2, color: '#000000', maxWidth: '1000px', margin: '0 auto 2rem' }}>
            {post.title}
          </h1>

          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 500 }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.375rem 1rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid var(--border)', color: '#000000', fontWeight: 600 }}>
                <User size={14} /> {post.profiles?.name || 'Anonymous'}
             </div>
             <span>•</span>
             <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Calendar size={14} /> {format(new Date(post.created_at), 'MMMM dd, yyyy')}
             </div>
          </div>
        </div>
      </header>

      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 340px', gap: '5rem', marginTop: '5rem' }}>
        <section style={{ maxWidth: '800px' }}>
          <div style={{ 
            fontSize: '1.125rem', 
            lineHeight: 1.75, 
            color: '#1f2937', 
            marginBottom: '5rem',
          }} className="prose">
            <ReactMarkdown>{post.body}</ReactMarkdown>
          </div>
          
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '4rem' }}>
             <CommentSection post_id={id} initialComments={post.comments || []} />
          </div>
        </section>

        <aside style={{ position: 'sticky', top: '120px', height: 'fit-content' }}>
          {post.summary && (
            <div className="glass-card" style={{ marginBottom: '2.5rem', padding: '2rem', borderLeft: '3px solid #000000', background: '#f8fafc' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#000000', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em' }}>
                 <Sparkles size={16} /> AI Summary
              </div>
              <p style={{ fontSize: '0.9375rem', color: '#374151', lineHeight: 1.6, fontStyle: 'italic', fontWeight: 500 }}>
                "{post.summary}"
              </p>
            </div>
          )}

          <div className="glass-card" style={{ padding: '2rem', background: '#ffffff', border: '1px solid var(--border)' }}>
             <h4 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 700, color: '#000000' }}>Article info</h4>
             <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '2rem' }}>
                This article was published on blog.ai, exploring the intersection of creative writing and artificial intelligence.
             </p>
             <button className="btn btn-primary" style={{ width: '100%', padding: '0.75rem', fontSize: '0.875rem' }}>Follow Author</button>
          </div>

          <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
             <Link href="/posts" style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 600, textDecoration: 'none' }}>← Back to feed</Link>
          </div>
        </aside>
      </div>
    </article>
  );
}

