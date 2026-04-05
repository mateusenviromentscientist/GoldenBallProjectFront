import { useContext } from 'react';
import { GoldenBallContext } from './GoldenBallContext';

export function useGoldenBallContext() {
  const ctx = useContext(GoldenBallContext);
  if (!ctx) {
    throw new Error('useGoldenBallContext must be used within GoldenBallProvider');
  }
  return ctx;
}
