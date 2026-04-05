import type { ReactNode } from 'react';
import { GoldenBallProvider } from '@/features/golden-ball/context/GoldenBallProvider';

type Props = { children: ReactNode };

export function AppProviders({ children }: Props) {
  return <GoldenBallProvider>{children}</GoldenBallProvider>;
}
