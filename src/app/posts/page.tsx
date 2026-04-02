import { getPosts } from "@/services/post";
import PostCard from "@/components/PostCard";
import SearchBar from "@/components/SearchBar";
import { Sparkles, TrendingUp } from "lucide-react";

export default async function PostListing({ 
  searchParams 
}: { 
  searchParams: Promise<{ q?: string; page?: string }> 
}) {
  const { q, page: pageStr } = await searchParams;
  const page = parseInt(pageStr || "1", 10);
  const searchQuery = q || "";

  const { data: posts, count } = await getPosts(page, searchQuery);

  const totalPages = Math.ceil((count || 0) / 10);

  return (
    <div className="container animate-up" style={{ paddingBottom: '8rem' }}>
      <header style={{ marginBottom: '6rem', padding: '6rem 0', borderBottom: '1px solid var(--border)', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.625rem', padding: '0.375rem 1rem', background: '#f8fafc', borderRadius: '100px', border: '1px solid var(--border)', marginBottom: '2rem', color: '#000000', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          <Sparkles size={14} /> Latest Insights
        </div>
        
        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '1.5rem', lineHeight: 1.2, color: '#000000' }}>
          Explore Innovation
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem', maxWidth: '650px', margin: '0 auto 4rem', lineHeight: 1.6 }}>
          Stay ahead of the curve with our community-driven insights and AI-moderated content discussions.
        </p>

        <SearchBar defaultValue={searchQuery} />
      </header>

      <section style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#000000' }}>
          <TrendingUp size={20} /> {searchQuery ? `Search Results for "${searchQuery}"` : "Global Feed"}
        </h2>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{posts?.length || 0} Articles</div>
      </section>

      <div className="grid-3">
        {posts?.map((post: any) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {(!posts || posts.length === 0) && (
        <div style={{ textAlign: 'center', padding: '6rem 0', background: '#f8fafc', borderRadius: '16px', border: '1px solid var(--border)' }}>
          <h3 style={{ color: '#000000', fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>No results found for "{searchQuery}"</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '2.5rem' }}>Broaden your search or browse our latest articles above.</p>
          <a href="/posts" className="btn btn-primary" style={{ padding: '0.875rem 3rem', textDecoration: 'none' }}>Reset Search</a>
        </div>
      )}

      {totalPages > 1 && (
        <div style={{ marginTop: '6rem', display: 'flex', justifyContent: 'center', gap: '1.25rem', alignItems: 'center' }}>
          <a href={`/posts?page=${page - 1}${searchQuery ? `&q=${searchQuery}` : ""}`} className={`btn btn-glass ${page <= 1 ? 'disabled' : ''}`} style={{ opacity: page <= 1 ? 0.3 : 1, pointerEvents: page <= 1 ? 'none' : 'auto', padding: '0.75rem 2rem', fontSize: '0.8125rem' }}>
            Previous
          </a>
          <div style={{ padding: '0 2rem', fontWeight: 600, fontSize: '0.875rem', color: '#000000', borderLeft: '1px solid var(--border)', borderRight: '1px solid var(--border)' }}>
             Page {page} of {totalPages}
          </div>
          <a href={`/posts?page=${page + 1}${searchQuery ? `&q=${searchQuery}` : ""}`} className={`btn btn-glass ${page >= totalPages ? 'disabled' : ''}`} style={{ opacity: page >= totalPages ? 0.3 : 1, pointerEvents: page >= totalPages ? 'none' : 'auto', padding: '0.75rem 2rem', fontSize: '0.8125rem' }}>
            Next
          </a>
        </div>
      )}
    </div>
  );
}

