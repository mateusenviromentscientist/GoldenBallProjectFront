# Golden Ball Project — Frontend

Mobile-first React SPA for browsing **Golden Ball award winners**.

The core experience is built around the `WinnerTable` — a card-based interactive list that lets users browse winners and view detailed profiles.

---

## Preview

> Select any winner card to reveal their full stats, country, and year in a side panel (desktop) or inline section (mobile).

---

## Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build tool | Vite 8 |
| Styling | Tailwind CSS v4 |
| Routing | React Router v7 |
| Icons | Lucide React |
| HTTP client | ky (no axios) |
| State management | Context API |

---

## Getting started

```bash
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev

# Type-check + production build
npm run build

# Preview production build
npm run preview

# Lint
npm run lint
```

---

## Project structure

```
frontend/src/
  app/
    layout/         # MainLayout, Sidebar (mobile drawer + desktop)
    providers/      # AppProviders (wraps context)
    router/         # AppRouter (lazy-loaded routes)
  features/
    golden-ball/
      components/   # WinnerTable, WinnerRowCard, WinnerDetailsCard, SearchBar
      context/      # GoldenBallContext, GoldenBallProvider, useGoldenBallContext
      data/         # Mock winners dataset
      hooks/        # useWinnerTable (filtered list logic)
      pages/        # GoldenBallPage
      types/        # Winner type (mirrors C# backend model)
      utils/        # filters.ts, countryFlags.ts
  shared/
    components/ui/  # Badge, EmptyState, SkeletonCard
    services/       # apiClient.ts (ky-based HTTP abstraction)
  styles/
    globals.css     # Tailwind v4 entry + gold theme tokens
```

---

## Winner data model

Mirrors the C# backend model exactly:

```ts
type Winner = {
  id: number;
  name: string | null;
  goals: number | null;
  assists: number | null;
  country: string | null;
  yearWinner: number | null;
  image: string | null;
};
```

---

## Features

- **Card-based winner table** — not a classic dense grid; each row is a premium interactive card
- **Winner details card** — click any row to reveal image, stats, country flag, and year
- **Search** — filter by name, country, or year in real time
- **Mobile-first** — stacked cards on mobile, sticky side panel on desktop
- **Lazy loading** — routes and heavy components loaded on demand via `React.lazy`
- **No axios** — HTTP layer built on `ky` with a shared `apiClient` abstraction
- **Strict TypeScript** — no `any`, full null safety matching the backend model

---

## Architecture decisions

- **Feature-based folder structure** — all Golden Ball logic lives under `features/golden-ball/`
- **Context API** for shared UI state (selected winner, search term, open/close)
- **`React.memo` + `useMemo` + `useCallback`** on list-critical components to avoid unnecessary re-renders
- **`countryFlags.ts` utility** — maps country names to emoji flags since the backend model has no flag field
- **Error fallback images** — winner avatars fall back to initials-based placeholder on load error

---

## Environment variables

Create `frontend/.env.local`:

```env
VITE_API_BASE_URL=https://your-api-url.com/api
```

Leave empty to use the local mock dataset.
