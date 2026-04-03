"use client";

import { useState, useEffect } from "react";
import { createComment } from "@/services/comment";
import { supabase } from "@/lib/supabase";
import toast, { Toaster } from "react-hot-toast";

export default function CommentSection({ post_id, initialComments = [] }: { post_id: string; initialComments: any[] }) {
  const [comments, setComments] = useState(initialComments);
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    async function getSession() {
       const { data: { session } } = await supabase.auth.getSession();
       if (session) setUserId(session.user.id);
    }
    getSession();
  }, []);

  async function handleComment(e: React.FormEvent) {
    e.preventDefault();
    if (!userId) return toast.error("Sign in to share your thoughts!");
    if (!commentText.trim()) return toast.error("Write a meaningful comment first!");

    setIsSubmitting(true);
    const newComment = await createComment({
      post_id,
      user_id: userId,
      comment_text: commentText
    });

    if (newComment) {
      setComments([{ ...newComment, profiles: { name: "You" } }, ...comments]);
      setCommentText("");
      toast.success("Message posted to community.");
    } else {
      toast.error("Error broadcasting comment. Please check your connection.");
    }
    setIsSubmitting(false);
  }

  return (
    <div className="glass-card" style={{ marginTop: '3rem', padding: '2.5rem', background: '#ffffff', border: '1px solid var(--border)' }}>
      <Toaster position="bottom-center" />
      <h3 style={{ marginBottom: '2rem', fontWeight: 800, color: '#000000', fontSize: '1.25rem' }}>
        Comments ({comments.length})
      </h3>
      
      <form onSubmit={handleComment} style={{ marginBottom: '3rem' }}>
        <textarea 
          placeholder={userId ? "Write a comment..." : "Sign in to post a comment"} 
          className="input-field" 
          disabled={!userId}
          style={{ minHeight: '100px', marginBottom: '1.25rem', padding: '1rem', fontSize: '0.9375rem', border: !userId ? '1px dashed var(--border)' : '1px solid var(--border)', fontWeight: 400 }} 
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button 
          type="submit" 
          disabled={isSubmitting || !userId} 
          className="btn btn-primary" 
          style={{ width: '100%', padding: '0.875rem', fontSize: '0.9375rem', opacity: !userId ? 0.4 : 1, cursor: !userId ? 'not-allowed' : 'pointer' }}
        >
          {isSubmitting ? "Posting..." : userId ? "Post Comment" : "Sign in to comment"}
        </button>
      </form>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {comments.map((comment: any) => (
          <div key={comment.id} style={{ borderLeft: '3px solid #000000', paddingLeft: '1.5rem', transition: 'all 0.2s ease' }}>
             <div style={{ border: '1px solid var(--border)', padding: '1.25rem', borderRadius: '10px', background: '#f8fafc' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.875rem', color: '#000000' }}>{comment.profiles?.name || 'User'}</span>
                  <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Just now</span>
                </div>
                <p style={{ fontSize: '0.9375rem', color: 'var(--foreground)', lineHeight: 1.5 }}>{comment.comment_text}</p>
             </div>
          </div>
        ))}
        {comments.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem 0', fontStyle: 'italic', background: '#f8fafc', borderRadius: '8px', border: '1px solid var(--border)' }}>
            No comments yet. Be the first to join the discussion.
          </p>
        )}
      </div>
    </div>
  );
}

