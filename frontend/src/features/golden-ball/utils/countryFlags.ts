const FLAGS: Record<string, string> = {
  Argentina: '🇦🇷',
  France: '🇫🇷',
  Poland: '🇵🇱',
  Croatia: '🇭🇷',
  Portugal: '🇵🇹',
  Brazil: '🇧🇷',
  Germany: '🇩🇪',
  Spain: '🇪🇸',
  Italy: '🇮🇹',
  England: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
  Netherlands: '🇳🇱',
  Belgium: '🇧🇪',
  Uruguay: '🇺🇾',
  Czech: '🇨🇿',
};

export function getCountryFlag(country: string | null): string {
  if (!country) return '🏳️';
  return FLAGS[country] ?? '🏳️';
}
