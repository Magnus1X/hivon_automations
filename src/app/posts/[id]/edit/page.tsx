"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { getPostById, updatePost } from "@/services/post";
import { supabase } from "@/lib/supabase";
import toast, { Toaster } from "react-hot-toast";

export default function EditPostPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = use(params);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    async function loadPost() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("You must be logged in to modify posts.");
        return router.push("/login");
      }
      
      const { data: profile } = await supabase.from('profiles').select('role').eq('id', session.user.id).single();
      setCurrentUser({ ...session.user, role: profile?.role });

      const post = await getPostById(id);
      if (post) {
        // Enforce RBAC for Editing
        if (post.author_id !== session.user.id && profile?.role !== 'admin') {
           toast.error("Unauthorized: You belong to a different sector.");
           return router.push(`/posts/${id}`);
        }
        setTitle(post.title);
        setBody(post.body);
        setImageUrl(post.image_url || "");
      } else {
        toast.error("Post not found in our records.");
        router.push("/posts");
      }
      setIsLoading(false);
    }
    loadPost();
  }, [id]);

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    
    const updated = await updatePost(id, { title, body, image_url: imageUrl });
    if (updated) {
      toast.success("Post updated to terminal successfully.");
      setTimeout(() => router.push(`/posts/${id}`), 1000);
    } else {
      toast.error("Transmission error. Failed to update post.");
    }
    setIsSubmitting(false);
  }

  if (isLoading) return <div className="container" style={{ textAlign: 'center', padding: '10rem' }}><h1 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--primary)' }}>INITIALIZING EDIT MODULE...</h1></div>;

  return (
    <div className="container animate-fade-in" style={{ paddingBottom: '10rem', paddingTop: '5rem' }}>
      <Toaster position="top-right" />
      <header style={{ marginBottom: '5rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '1.5rem', background: 'linear-gradient(135deg, white, var(--primary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-1.25px' }}>
          Revise Transmission
        </h1>
        <p style={{ color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.95rem' }}>// Editing Article ID: {id.substring(0, 8)}...</p>
      </header>

      <form onSubmit={handleUpdate} className="glass-card" style={{ maxWidth: '850px', margin: '0 auto', padding: '4rem', boxShadow: '0 30px 60px rgba(0,0,0,0.4)', border: '1px solid var(--glass-border)' }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '1px' }}>Headline</label>
          <input 
            type="text" 
            className="input-field" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required 
            style={{ fontSize: '1.4rem', padding: '1.25rem', fontWeight: 700 }}
          />
        </div>

        <div style={{ marginBottom: '2.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '1px' }}>Cover Image Resource</label>
          <input 
            type="url" 
            className="input-field" 
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            style={{ padding: '1rem 1.25rem' }}
          />
        </div>

        <div style={{ marginBottom: '4rem' }}>
          <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '1px' }}>Article Core (Markdown)</label>
          <textarea 
            className="input-field" 
            style={{ minHeight: '550px', padding: '2rem', fontSize: '1.15rem', lineHeight: 1.8, fontWeight: 500, background: 'rgba(0,0,0,0.2)' }}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required 
          />
        </div>

        <div style={{ display: 'flex', gap: '2rem' }}>
           <button type="submit" disabled={isSubmitting} className="btn btn-primary" style={{ flexGrow: 1, padding: '1.4rem', fontSize: '1.2rem', fontWeight: 900 }}>
             {isSubmitting ? "UPDATING TRANSMISSION..." : "COMMIT CHANGES"}
           </button>
           <button type="button" onClick={() => router.back()} className="btn glass-card" style={{ padding: '0 3rem', border: '1px solid var(--glass-border)', color: 'white', fontWeight: 700 }}>CANCEL</button>
        </div>
      </form>
    </div>
  );
}
