import { fetchJson } from '@/shared/services/apiClient';
import type { Winner } from '../types/winner';

export async function fetchWinners(signal?: AbortSignal): Promise<Winner[]> {
  return fetchJson<Winner[]>('api/players', signal);
}
