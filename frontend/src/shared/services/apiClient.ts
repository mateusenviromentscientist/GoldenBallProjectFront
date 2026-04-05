import ky from 'ky';

export const apiClient = ky.create({
  prefixUrl: import.meta.env.VITE_API_BASE_URL ?? '',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function fetchJson<T>(url: string): Promise<T> {
  return apiClient.get(url).json<T>();
}
