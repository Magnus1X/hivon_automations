"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchBar({ defaultValue = "" }: { defaultValue?: string }) {
  const router = useRouter();
  const [query, setQuery] = useState(defaultValue);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query) {
      router.push(`/posts?q=${encodeURIComponent(query)}`);
    } else {
      router.push("/posts");
    }
  }

  return (
    <form onSubmit={handleSearch} style={{ maxWidth: '640px', margin: '0 auto', display: 'flex', gap: '0.75rem', background: '#ffffff', padding: '0.375rem', borderRadius: '12px', border: '1px solid var(--border)', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
      <input 
        type="text" 
        placeholder="Search articles and insights..." 
        className="input-field" 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ border: 'none', background: 'transparent', flexGrow: 1, fontSize: '0.9375rem', padding: '0 1rem', fontWeight: 500 }} 
      />
      <button type="submit" className="btn btn-primary" style={{ padding: '0.625rem 1.5rem', fontSize: '0.875rem' }}>Search</button>
    </form>
  );
}
