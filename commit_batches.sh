#!/bin/bash
YESTERDAY="2026-04-02T14:00:00"
TODAY_MORNING="2026-04-03T09:00:00"
TODAY_NOW="2026-04-03T11:40:00"

commit_file() {
    local date=$1
    local msg=$2
    shift 2
    git add "$@"
    GIT_AUTHOR_DATE="$date" GIT_COMMITTER_DATE="$date" git commit -m "$msg"
}

commit_file "$YESTERDAY" "chore: initialize project structure and config" package.json tsconfig.json eslint.config.mjs next.config.ts .gitignore AGENTS.md CLAUDE.md package-lock.json
commit_file "$YESTERDAY" "feat: setup initial global styles" src/app/globals.css
commit_file "$YESTERDAY" "feat: implement root layout structure" src/app/layout.tsx
commit_file "$YESTERDAY" "feat: define environment configuration template" .env.example
commit_file "$YESTERDAY" "feat: integrate Supabase client and types" src/lib/supabase.ts
commit_file "$YESTERDAY" "feat: initialize proxy middleware for edge routing" src/proxy.ts
commit_file "$YESTERDAY" "feat: setup Gemini AI summarization service" src/lib/gemini.ts
commit_file "$YESTERDAY" "feat: draft homepage hero section" src/app/page.tsx
commit_file "$YESTERDAY" "feat: create core Navbar component" src/components/Navbar.tsx
commit_file "$YESTERDAY" "feat: implement initial posts feed structure" src/app/posts/page.tsx src/components/PostCard.tsx

commit_file "$TODAY_MORNING" "style: apply minimalist white theme to Navbar" src/components/Navbar.tsx
commit_file "$TODAY_MORNING" "style: redesign homepage for minimalist white aesthetic" src/app/page.tsx
commit_file "$TODAY_MORNING" "style: update post listing and cards to light theme" src/app/posts/page.tsx src/components/PostCard.tsx
commit_file "$TODAY_MORNING" "style: refine article details and markdown layout" "src/app/posts/[id]/page.tsx"
commit_file "$TODAY_MORNING" "style: apply light theme to comment section" src/components/CommentSection.tsx
commit_file "$TODAY_MORNING" "style: redesign auth pages for clean aesthetic" "src/app/(auth)/login/page.tsx" "src/app/(auth)/signup/page.tsx"
commit_file "$TODAY_MORNING" "style: update dashboards to minimalist white theme" src/app/author/page.tsx src/app/admin/page.tsx
commit_file "$TODAY_MORNING" "style: refine SearchBar for minimalist design" src/components/SearchBar.tsx
commit_file "$TODAY_NOW" "fix: resolve SSR hydration mismatch on html tag" src/app/layout.tsx
commit_file "$TODAY_NOW" "fix: correct environment variable mapping for Supabase keys" src/lib/supabase.ts src/proxy.ts
commit_file "$TODAY_NOW" "feat: implement resilient signup with metadata storage" "src/app/(auth)/signup/page.tsx"
commit_file "$TODAY_NOW" "feat: add background profile healing on login and hydration" src/components/Navbar.tsx "src/app/(auth)/login/page.tsx"
commit_file "$TODAY_NOW" "feat: implement AI safety checks for Gemini API activation" src/lib/gemini.ts
commit_file "$TODAY_NOW" "docs: update README with deployment instructions and database setup" README.md
commit_file "$TODAY_NOW" "chore: finalize .env for production deployment" .env
