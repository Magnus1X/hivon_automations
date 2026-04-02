import { createBrowserClient } from '@supabase/ssr';

// Fallback to empty strings if environment variables are missing to prevent runtime crash
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || "";

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "⚠️ Supabase environment variables are missing. Please add NEXT_PUBLIC_SUPABASE_URL and either NEXT_PUBLIC_SUPABASE_ANON_KEY or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY to your .env.local file."
  );
}

export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);

export type Post = {
  id: string;
  title: string;
  body: string;
  image_url?: string;
  summary?: string;
  author_id: string;
  created_at: string;
  updated_at: string;
  profiles?: {
    name: string;
    email: string;
    role: 'author' | 'viewer' | 'admin';
  };
};

export type Comment = {
  id: string;
  post_id: string;
  user_id: string;
  comment_text: string;
  created_at: string;
  profiles?: {
    name: string;
  };
};

export type Profile = {
  id: string;
  name: string;
  email: string;
  role: 'author' | 'viewer' | 'admin';
};
