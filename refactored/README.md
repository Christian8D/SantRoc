## Sant Roc CMS (Vue Refactor)

This is a Vue 3 + TypeScript + Vite refactor of the Next.js app, located in `refactored/`. It includes Tailwind CSS, DaisyUI, Vue Router, Pinia, and a Supabase client.

### Prerequisites
- Node.js 18+
- PNPM (recommended) or npm/yarn

### Setup
1. Copy environment variables:
   - Create `.env` in `refactored/` with:
```
VITE_SUPABASE_URL=your-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```
2. Install dependencies:
```
pnpm install
```

### Development
```
pnpm dev
```

### Build (static output)
```
pnpm build
```
The static site is generated in `refactored/dist/` and can be uploaded to a static host.

### Structure
- `src/router` — routes (`/` and `/admin`)
- `src/components/home` — `HeroSection`, `MusicSection`, `VideosSection`, `EventsSection`
- `src/components/admin` — `AdminDashboard` placeholder
- `src/lib/supabase.ts` — Supabase browser client

### Notes
- Assets are referenced from `/sant-roc-logo.png`. Copy required images into `refactored/public/` for production deployments or adjust paths accordingly.

