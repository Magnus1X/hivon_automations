"use client";

import { createPost } from "@/services/post";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import toast, { Toaster } from 'react-hot-toast';

export default function CreatePostForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function getSession() {
       const { data: { session } } = await supabase.auth.getSession();
       if (session) setUserId(session.user.id);
    }
    getSession();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!userId) return toast.error("You must be logged in to post.");
    if (!title || !body) return toast.error("Headline and story content are mandatory.");

    setIsSubmitting(true);
    const postData = {
      title,
      body,
      image_url: imageUrl,
      author_id: userId,
    };

    const newPost = await createPost(postData);
    if (newPost) {
      toast.success("Article published! AI summary generated instantly.");
      setTimeout(() => router.push(`/posts/${newPost.id}`), 1500);
    } else {
      toast.error("An error occurred during publication. Check your permissions.");
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card animate-up" style={{ padding: '3rem', maxWidth: '720px', margin: '0 auto', background: '#ffffff', border: '1px solid var(--border)' }}>
      <Toaster position="top-center" />
      <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '2rem', textAlign: 'center', color: '#000000' }}>
        Write your next story
      </h2>
      
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.625rem', fontWeight: 600, color: '#000000', fontSize: '0.75rem' }}>Title</label>
        <input 
          type="text" 
          placeholder="Give your story a title..." 
          className="input-field" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required 
          style={{ fontSize: '1.125rem', padding: '0.875rem 1rem', fontWeight: 600 }}
        />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.625rem', fontWeight: 600, color: '#000000', fontSize: '0.75rem' }}>Cover Image URL (Optional)</label>
        <input 
          type="url" 
          placeholder="https://images.unsplash.com/your-image" 
          className="input-field" 
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          style={{ padding: '0.75rem 1rem' }}
        />
      </div>

      <div style={{ marginBottom: '2.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.625rem', fontWeight: 600, color: '#000000', fontSize: '0.75rem' }}>Content (Markdown)</label>
        <textarea 
          placeholder="Write your story here..." 
          className="input-field" 
          style={{ minHeight: '400px', padding: '1rem', fontSize: '1rem', lineHeight: 1.6, fontWeight: 400 }}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
        <p style={{ marginTop: '1rem', fontSize: '0.8125rem', color: 'var(--text-muted)', fontStyle: 'italic', fontWeight: 500 }}>
          💡 Tip: Our AI will automatically generate a summary for your article.
        </p>
      </div>

      <button type="submit" disabled={isSubmitting || !userId} className="btn btn-primary" style={{ width: '100%', padding: '0.875rem', fontSize: '1rem' }}>
        {isSubmitting ? "Publishing article..." : "Publish Article"}
      </button>
    </form>
  );
}

