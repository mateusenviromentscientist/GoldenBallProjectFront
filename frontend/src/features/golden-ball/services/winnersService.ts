import { fetchJson } from '@/shared/services/apiClient';
import type { Winner } from '../types/winner';

type ApiResponse = Winner[] | { $values: Winner[] } | { data: Winner[] };

function extractArray(response: ApiResponse): Winner[] {
  if (Array.isArray(response)) return response;
  if ('$values' in response && Array.isArray(response.$values)) return response.$values;
  if ('data' in response && Array.isArray(response.data)) return response.data;
  return [];
}

export async function fetchWinners(signal?: AbortSignal): Promise<Winner[]> {
  const response = await fetchJson<ApiResponse>('api/players', signal);
  return extractArray(response);
}
