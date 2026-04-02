import { Post } from "@/lib/supabase";
import Link from "next/link";
import { format } from "date-fns";
import { MoveRight, Calendar, User } from "lucide-react";

export default function PostCard({ post }: { post: Post }) {
  return (
    <div className="glass-card animate-up" style={{ padding: '0', overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column', background: '#ffffff' }}>
      <div style={{ height: '200px', background: '#f8fafc', position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--border)' }}>
        {post.image_url ? (
          <img src={post.image_url} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }} onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')} onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')} />
        ) : (
          <div style={{ height: '100%', display: 'grid', placeContent: 'center', opacity: '0.3' }}>
            <span style={{ fontSize: '3rem' }}>✍️</span>
          </div>
        )}
      </div>

      <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: '0.625rem', fontWeight: 700, color: '#6366f1', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Article</div>
        
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', lineHeight: 1.3, color: '#000000' }}>
          <Link href={`/posts/${post.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>{post.title}</Link>
        </h2>
        
        {post.summary ? (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem', lineHeight: 1.5, flexGrow: 1 }}>
            {post.summary.substring(0, 120)}...
          </p>
        ) : (
          <div style={{ flexGrow: 1 }} />
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border)', color: 'var(--text-muted)', fontWeight: 500 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <User size={12} /> {post.profiles?.name || 'Anonymous'}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
             <Calendar size={12} /> {format(new Date(post.created_at), 'MMM dd, yyyy')}
          </div>
        </div>

        <Link href={`/posts/${post.id}`} className="btn btn-primary" style={{ marginTop: '1.5rem', padding: '0.625rem', fontSize: '0.75rem', borderRadius: '6px', textDecoration: 'none' }}>
           Read More <MoveRight size={14} />
        </Link>
      </div>
    </div>
  );
}

