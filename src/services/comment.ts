import { supabase, Comment } from "@/lib/supabase";

export async function createComment(comment: { post_id: string; user_id: string; comment_text: string }) {
  const { data, error } = await supabase
    .from('comments')
    .insert(comment)
    .select()
    .single();

  if (error) {
    console.error("Comment Creation Error:", error);
    return null;
  }

  return data;
}

export async function deleteComment(id: string) {
  const { error } = await supabase
    .from('comments')
    .delete()
    .eq('id', id);

  if (error) {
    console.error("Comment Deletion Error:", error);
    return false;
  }

  return true;
}
