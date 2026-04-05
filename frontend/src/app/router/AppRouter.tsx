import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from '@/app/layout/MainLayout';
import { AppProviders } from '@/app/providers/AppProviders';

const GoldenBallPage = lazy(() =>
  import('@/features/golden-ball/pages/GoldenBallPage').then((m) => ({
    default: m.GoldenBallPage,
  }))
);

function LoadingScreen() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    </div>
  );
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <AppProviders>
        <MainLayout>
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              <Route path="/" element={<GoldenBallPage />} />
            </Routes>
          </Suspense>
        </MainLayout>
      </AppProviders>
    </BrowserRouter>
  );
}
