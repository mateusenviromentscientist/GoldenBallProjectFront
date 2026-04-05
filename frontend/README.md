# Golden Ball — Frontend

Mobile-first React SPA for browsing Golden Ball award winners.

## Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build tool | Vite 8 |
| Styling | Tailwind CSS v4 |
| Routing | React Router v7 |
| Icons | Lucide React |
| HTTP client | ky (no axios) |
| State | Context API |

## Getting started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Type-check + build for production
npm run build

# Preview production build
npm run preview

# Lint
npm run lint
```

## Project structure

```
src/
  app/
    layout/         # MainLayout, Sidebar (mobile drawer + desktop)
    providers/      # AppProviders
    router/         # AppRouter (lazy-loaded routes)
  features/
    golden-ball/
      components/   # WinnerTable, WinnerRowCard, WinnerDetailsCard, SearchBar
      context/      # GoldenBallContext, GoldenBallProvider, useGoldenBallContext
      data/         # Mock winners dataset
      hooks/        # useWinnerTable
      pages/        # GoldenBallPage
      types/        # Winner type (mirrors C# backend model)
      utils/        # filters, countryFlags
  shared/
    components/ui/  # Badge, EmptyState, SkeletonCard
    services/       # apiClient (ky-based HTTP abstraction)
  styles/
    globals.css     # Tailwind v4 entry + theme tokens
```

## Winner data model

Mirrors the C# backend model:

```ts
type Winner = {
  id: number;
  name: string | null;
  assists: number | null;
  goals: number | null;
  country: string | null;
  yearWinner: number | null;
  image: string | null;
};
```

## Features

- Card-based winner table (not a classic grid)
- Click any row to open the winner details card
- Search by name, country, or year
- Mobile: details card appears above the list
- Desktop: sticky side panel
- Lazy-loaded routes via `React.lazy` + `Suspense`
- Fully typed with strict TypeScript (no `any`)

## Environment variables

Create a `.env.local` file at the root of `frontend/`:

```env
VITE_API_BASE_URL=https://your-api-url.com/api
```

Leave empty to use mock data only.
