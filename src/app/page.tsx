"use client";

import Link from "next/link";
import { MoveRight, Zap, Shield, Cpu } from "lucide-react";

export default function Home() {
  return (
    <div className="container" style={{ paddingBottom: '8rem' }}>
      {/* Hero Section */}
      <section className="animate-up" style={{ textAlign: 'center', paddingTop: '8rem', paddingBottom: '6rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.625rem', padding: '0.375rem 1rem', background: '#f8fafc', borderRadius: '100px', border: '1px solid var(--border)', marginBottom: '2.5rem', color: '#000000', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          <div style={{ padding: '0.125rem 0.5rem', background: '#000000', borderRadius: '100px', color: 'white', fontSize: '0.625rem' }}>NEW</div>
          Powered by Gemini 1.5 Flash
        </div>

        <h1 style={{ 
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', 
          lineHeight: 1.1, 
          marginBottom: '1.5rem', 
          color: '#000000',
          maxWidth: '900px',
          margin: '0 auto 1.5rem'
        }}>
          The future of <br className="lg:block hidden" />
          <span style={{ opacity: 0.6 }}>creative writing is AI.</span>
        </h1>
        
        <p style={{ 
          color: 'var(--text-muted)', 
          fontSize: '1.125rem', 
          maxWidth: '600px', 
          margin: '0 auto 3rem',
          lineHeight: 1.6
        }}>
          A premium, full-stack blogging experience. Focus on your writing while our advanced AI models orchestrate summaries and insights automatically.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link href="/signup" className="btn btn-primary" style={{ padding: '0.875rem 2.5rem', fontSize: '0.9375rem', textDecoration: 'none' }}>
            Build Your Network <MoveRight size={16} />
          </Link>
          <Link href="/posts" className="btn btn-glass" style={{ padding: '0.875rem 2.5rem', fontSize: '0.9375rem', textDecoration: 'none' }}>
            Explore Articles
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <div className="grid-3">
        {[
          { icon: <Cpu size={20} />, title: 'AI-Powered Orchestration', body: 'Automatically generate high-fidelity summaries using Google Gemini 1.5 Flash instantly upon creation.' },
          { icon: <Shield size={20} />, title: 'Secured Infrastructure', body: 'Enterprise-grade Role Based Access Control (RBAC) powered by Supabase and Next.js Edge Middleware.' },
          { icon: <Zap size={20} />, title: 'Hyper-Fast Performance', body: 'Built on the Next.js App Router with React 19 and Server Actions for a zero-client-latency UX.' },
        ].map((feature, i) => (
          <div key={i} className="glass-card animate-up" style={{ padding: '2.5rem', animationDelay: `${i * 0.1}s` }}>
            <div style={{ width: '40px', height: '40px', background: '#f8fafc', border: '1px solid var(--border)', borderRadius: '10px', display: 'grid', placeContent: 'center', color: '#000000', marginBottom: '1.5rem' }}>
              {feature.icon}
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: '#000000' }}>{feature.title}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem', lineHeight: 1.6 }}>{feature.body}</p>
          </div>
        ))}
      </div>

      {/* Call to Action Banner */}
      <section className="glass-card animate-up" style={{ marginTop: '8rem', padding: '5rem 3rem', textAlign: 'center', border: '1px solid var(--border)', background: '#f8fafc' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#000000' }}>Ready to redefine your blog?</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '2.5rem', maxWidth: '500px', margin: '0 auto 2.5rem' }}>
          Join authors who are already using AI-driven orchestration to scale their reach and insight.
        </p>
        <Link href="/signup" className="btn btn-primary" style={{ padding: '0.875rem 3rem', textDecoration: 'none' }}>Get Started Free</Link>
      </section>
    </div>
  );
}

