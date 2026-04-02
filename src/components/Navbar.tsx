"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    async function getSession() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
        const { getProfile, createProfile } = await import("@/services/profile");
        const profile = await getProfile(session.user.id);
        if (profile) {
          setRole(profile.role);
        } else {
          // Heal profile if missing
          const newProfile = await createProfile({
            id: session.user.id,
            name: session.user.user_metadata?.name || "Community Member",
            email: session.user.email || "",
            role: session.user.user_metadata?.role || "viewer"
          });
          if (newProfile) setRole(newProfile.role);
        }
      }
    }
    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_err, session) => {
      setUser(session?.user || null);
      if (session) {
        const { getProfile, createProfile } = await import("@/services/profile");
        const profile = await getProfile(session.user.id);
        if (profile) {
          setRole(profile.role);
        } else {
          try {
            const newProfile = await createProfile({
              id: session.user.id,
              name: session.user.user_metadata?.name || "Community Member",
              email: session.user.email || "",
              role: session.user.user_metadata?.role || "viewer"
            });
            if (newProfile) setRole(newProfile.role);
          } catch (e) { console.error("Auto-heal failed:", e); }
        }
      } else {
        setRole(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push('/');
  }

  return (
    <nav style={{
      padding: '0.75rem 0',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '1px solid var(--border)',
      background: '#ffffff',
      position: 'sticky',
      top: 0,
      zIndex: 2000,
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <Link href="/" style={{ 
          fontSize: '1.25rem', 
          fontWeight: 800, 
          letterSpacing: '-0.02em',
          color: '#000000',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '0.625rem'
        }}>
          <div style={{ width: '28px', height: '28px', background: 'var(--primary)', borderRadius: '6px', display: 'grid', placeContent: 'center', fontSize: '0.875rem', fontWeight: 800, color: 'white' }}>B</div>
          <span>blog.ai</span>
        </Link>
        
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {[
            { name: 'Network', href: '/posts' },
            { name: 'Publisher', href: '/author', roles: ['author', 'admin'] },
            { name: 'Terminal', href: '/admin', roles: ['admin'] },
          ].map((link) => {
            if (link.roles && (!role || !link.roles.includes(role))) return null;
            return (
              <Link key={link.name} href={link.href} style={{ 
                fontWeight: 600, 
                fontSize: '0.8125rem',
                color: pathname === link.href ? '#000000' : 'var(--text-muted)',
                transition: 'all 0.2s ease',
                textDecoration: 'none'
              }}>
                {link.name}
              </Link>
            );
          })}

          <div style={{ display: 'flex', gap: '1.25rem', borderLeft: '1px solid var(--border)', paddingLeft: '1.5rem', alignItems: 'center', marginLeft: '0.5rem' }}>
            {user ? (
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                 <span style={{ fontWeight: 600, color: '#000000', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{role}</span>
                 <button onClick={handleSignOut} className="btn btn-glass" style={{ padding: '0.5rem 1rem', fontSize: '0.75rem' }}>Sign Out</button>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                <Link href="/login" style={{ fontWeight: 600, fontSize: '0.8125rem', color: '#000000', textDecoration: 'none' }}>Log In</Link>
                <Link href="/signup" className="btn btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.8125rem', textDecoration: 'none' }}>Join</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

