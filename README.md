# AI-Powered Blogging Platform

A next-generation, minimalist blogging platform featuring automated AI orchestration for article summaries and insights. Built with **Next.js 16**, **Supabase**, and **Google Gemini 1.5 Flash**.

## 🎨 Design Philosophy
The platform follows a **Minimalist White** design system, prioritizing typography, whitespace, and a clean user experience over typical glassmorphism or high-contrast dark themes.

## ✨ Core Features
- **AI Content Orchestration**: Automatically generate engaging 200-word summaries for every article using Gemini 1.5 Flash.
- **Smart RBAC (Role Based Access)**: Secure authentication and route protection for Admins, Authors, and Viewers.
- **Resilient User Onboarding**: Background profile healing ensures public user data is synced even during authentication race conditions.
- **SEO Optimized**: Modern metadata structure with high-performance SSR and client hydration safety.

## 🛠️ Prerequisites
- **Supabase Account**: For database, authentication, and real-time updates.
- **Google AI Studio Key**: To power the Gemini 1.5 Flash summarization model.

## ⚙️ Environment Configuration (`.env`)
Ensure the following variables are set in your local and production environments:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_key_alias (fallback)
GOOGLE_AI_API_KEY=your_gemini_api_key
```

## 🗄️ Database Setup (Supabase)
To ensure the platform functions correctly, run the following in your Supabase SQL Editor:

### 1. Schema
Create `profiles`, `posts`, and `comments` tables. Ensure `profiles` has `id`, `name`, `email`, and `role`.

### 2. RLS Policies
Ensure policies are enabled for `profiles`:
- **SELECT**: Enable for all authenticated users.
- **INSERT/UPDATE**: Enable for `auth.uid() = id`.

### 3. Recommended Trigger
Use a trigger to sync `auth.users` metadata into the `profiles` table automatically on signup:
```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email, role)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'name', NEW.email, COALESCE(NEW.raw_user_meta_data->>'role', 'viewer'));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

## 🚀 Deployment
1. Connect your repository to **Vercel** or your preferred VPS.
2. Add the environment variables from your `.env` to the deployment settings.
3. Run `npm run build` to generate the production bundle.
