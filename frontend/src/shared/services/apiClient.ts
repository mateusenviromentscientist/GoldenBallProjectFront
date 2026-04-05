import ky from 'ky';

export const apiClient = ky.create({
  prefixUrl: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5127',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function fetchJson<T>(url: string, signal?: AbortSignal): Promise<T> {
  return apiClient.get(url, { signal }).json<T>();
}
