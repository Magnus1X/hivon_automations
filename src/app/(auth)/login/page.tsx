"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import toast, { Toaster } from "react-hot-toast";
import { ArrowLeft, LogIn } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { data: authData, error } = await (supabase.auth as any).signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (authData.user) {
        // Heal the profile if it's missing (e.g., if signup creation failed)
        try {
          const { getProfile, createProfile } = await import("@/services/profile");
          const profile = await getProfile(authData.user.id);
          if (!profile) {
            await createProfile({
              id: authData.user.id,
              name: authData.user.user_metadata?.name || "Community Member",
              email: authData.user.email || "",
              role: authData.user.user_metadata?.role || "viewer"
            });
          }
        } catch (healError) {
          console.warn("Profile check/heal skipped during login.");
        }
      }

      toast.success("Account initialized! Access granted.");
      setTimeout(() => router.push("/posts"), 1000);
    } catch (error: any) {
      if (error.message?.includes("Email not confirmed")) {
        toast.error("Please verify your email before accessing the platform.");
      } else if (error.status === 400 || error.message?.includes("Invalid login")) {
        toast.error("Invalid credentials. Please double check your entries.");
      } else {
        toast.error(error.message || "Access denied.");
      }
    } finally {
      setIsLoading(false);
    }

  }

  return (
    <div className="container animate-up" style={{ maxWidth: '440px', paddingTop: '6rem', paddingBottom: '6rem' }}>
      <Toaster position="top-center" />
      
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '3rem', color: 'var(--text-muted)', fontSize: '0.8125rem', fontWeight: 600, textDecoration: 'none' }}>
        <ArrowLeft size={14} /> Back to home
      </Link>

      <div className="glass-card" style={{ padding: '3rem', background: '#ffffff', border: '1px solid var(--border)' }}>
        <div style={{ width: '40px', height: '40px', background: '#f8fafc', border: '1px solid var(--border)', borderRadius: '10px', display: 'grid', placeContent: 'center', color: '#000000', marginBottom: '2rem' }}>
           <LogIn size={20} />
        </div>
        
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.75rem', color: '#000000' }}>Welcome back</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '0.9375rem', lineHeight: 1.5 }}>Sign in to access your personalized feed.</p>
        
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.625rem', fontWeight: 600, color: '#000000', fontSize: '0.75rem' }}>Email Address</label>
            <input 
              type="email" 
              className="input-field" 
              placeholder="you@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div style={{ marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.625rem' }}>
               <label style={{ fontWeight: 600, color: '#000000', fontSize: '0.75rem' }}>Password</label>
               <Link href="/reset" style={{ color: '#6366f1', fontSize: '0.75rem', textDecoration: 'none', fontWeight: 600 }}>Forgot?</Link>
            </div>
            <input 
              type="password" 
              className="input-field" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading} 
            className="btn btn-primary" 
            style={{ width: '100%', padding: '0.875rem', fontSize: '0.9375rem' }}
          >
            {isLoading ? "Signing in..." : "Log In"}
          </button>
        </form>

        <p style={{ marginTop: '2.5rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Don't have an account? <Link href="/signup" style={{ color: '#000000', textDecoration: 'none', fontWeight: 700 }}>Join now</Link>
        </p>
      </div>
    </div>
  );
}

