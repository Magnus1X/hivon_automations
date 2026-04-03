import { supabase } from "@/lib/supabase";

export async function getProfile(id: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error("Profile Fetch Error:", error);
    return null;
  }

  return data;
}

export async function createProfile(profile: { id: string; name: string; email: string; role: 'author' | 'viewer' | 'admin' }) {
  const { data, error } = await supabase
    .from('profiles')
    .upsert(profile)
    .select()
    .single();

  if (error) {
    console.error("Profile Creation Error:", error);
    return null;
  }

  return data;
}
