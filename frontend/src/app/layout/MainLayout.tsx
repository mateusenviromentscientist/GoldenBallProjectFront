import type { ReactNode } from 'react';
import { Sidebar } from './Sidebar';

type Props = { children: ReactNode };

export function MainLayout({ children }: Props) {
  return (
    <div className="flex min-h-screen bg-gray-950">
      <Sidebar />
      <main className="flex-1 min-w-0 p-4 pt-20 lg:pt-6 lg:p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}
