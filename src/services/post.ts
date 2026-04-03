import { supabase, Post } from "@/lib/supabase";
import { generateSummary } from "@/lib/gemini";

export async function createPost(post: Omit<Post, 'id' | 'created_at' | 'updated_at' | 'summary'>) {
  // Generate summary only once
  let summary = "";
  try {
    const aiSummary = await generateSummary(post.body);
    summary = aiSummary || "";
  } catch (error) {
    console.warn("AI Summary generation failed, proceeding without summary", error);
  }

  const { data, error } = await supabase
    .from('posts')
    .insert({ ...post, summary })
    .select()
    .single();

  if (error) {
    console.error("Post Creation Error:", error);
    return null;
  }

  return data;
}

export async function updatePost(id: string, updates: Partial<Post>) {
  const { data, error } = await supabase
    .from('posts')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error("Post Update Error:", error);
    return null;
  }

  return data;
}

export async function getPosts(page = 1, searchQuery = "", pageSize = 10) {
  let query = supabase
    .from('posts')
    .select('*, profiles(name, role)', { count: 'exact' });

  if (searchQuery) {
    query = query.ilike('title', `%${searchQuery}%`);
  }

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await query
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) {
    console.error("Posts Fetch Error:", error);
    return { data: [], count: 0 };
  }

  return { data, count };
}

export async function getPostById(id: string) {
  const { data, error } = await supabase
    .from('posts')
    .select('*, profiles(name, role), comments(*, profiles(name))')
    .eq('id', id)
    .single();

  if (error) {
    console.error("Post Detail Fetch Error:", error);
    return null;
  }

  return data;
}
