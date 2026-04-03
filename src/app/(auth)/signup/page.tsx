"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { createProfile } from "@/services/profile";
import toast, { Toaster } from "react-hot-toast";
import { Sparkles, ArrowLeft, ShieldCheck, UserPlus } from "lucide-react";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<'author' | 'viewer'>('viewer');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { data: authData, error: authError } = await (supabase.auth as any).signUp({
        email,
        password,
        options: {
          data: {
            name,
            role,
          }
        }
      });

      if (authError) throw authError;

      if (authData.user) {
        // Attempt to create the profile, but don't blocking signup if it fails (as metadata is already saved)
        try {
          await createProfile({
            id: authData.user.id,
            name,
            email,
            role
          });
        } catch (profileError) {
          console.warn("Profile creation deferred, using metadata as fallback.");
        }
        
        toast.success("Account initialized! Access granted. Check mail for verification.");
        setTimeout(() => router.push("/posts"), 1000);
      }
    } catch (error: any) {
      if (error.status === 429 || error.message?.includes("rate limit")) {
        toast.error("Registration threshold reached. Please wait a moment or try logging in.");
      } else {
        toast.error(error.message || "An error occurred during onboarding.");
      }
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <div className="container animate-up" style={{ maxWidth: '480px', paddingTop: '6rem', paddingBottom: '6rem' }}>
      <Toaster position="top-center" />
      
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '3rem', color: 'var(--text-muted)', fontSize: '0.8125rem', fontWeight: 600, textDecoration: 'none' }}>
        <ArrowLeft size={14} /> Back to home
      </Link>

      <div className="glass-card" style={{ padding: '3rem', background: '#ffffff', border: '1px solid var(--border)' }}>
        <div style={{ width: '40px', height: '40px', background: '#f8fafc', border: '1px solid var(--border)', borderRadius: '10px', display: 'grid', placeContent: 'center', color: '#000000', marginBottom: '2rem' }}>
           <UserPlus size={20} />
        </div>
        
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.75rem', color: '#000000' }}>Create account</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '0.9375rem', lineHeight: 1.5 }}>Join our community of AI-powered writers.</p>
        
        <form onSubmit={handleSignup}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.625rem', fontWeight: 600, color: '#000000', fontSize: '0.75rem' }}>Full Name</label>
            <input 
              type="text" 
              className="input-field" 
              placeholder="First and last name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required 
            />
          </div>

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

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.625rem', fontWeight: 600, color: '#000000', fontSize: '0.75rem' }}>Password</label>
            <input 
              type="password" 
              className="input-field" 
              placeholder="Min. 8 characters" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <div style={{ marginBottom: '2.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.625rem', fontWeight: 600, color: '#000000', fontSize: '0.75rem' }}>Account Type</label>
            <select 
              className="input-field" 
              style={{ 
                appearance: 'none', 
                background: 'white url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 20 20\' fill=\'%231a1a1a\'%3E%3Cpath fill-rule=\'evenodd\' d=\'M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z\' clip-rule=\'evenodd\' /%3E%3C/svg%3E") no-repeat right 1rem center',
                backgroundSize: '1.25rem'
              }} 
              value={role}
              onChange={(e) => setRole(e.target.value as any)}
            >
              <option value="viewer">Viewer - Read & Discuss</option>
              <option value="author">Author - Write & Publish</option>
            </select>
          </div>

          <button 
            type="submit" 
            disabled={isLoading} 
            className="btn btn-primary" 
            style={{ width: '100%', padding: '0.875rem', fontSize: '0.9375rem' }}
          >
            {isLoading ? "Creating account..." : "Join"}
          </button>
        </form>

        <p style={{ marginTop: '2.5rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Already have an account? <Link href="/login" style={{ color: '#000000', textDecoration: 'none', fontWeight: 700 }}>Log In</Link>
        </p>

        <div style={{ marginTop: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.625rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
           <ShieldCheck size={14} /> End-to-end secure auth
        </div>
      </div>
    </div>
  );
}

