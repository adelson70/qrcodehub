/**
 * Ad configuration, resolved from the publisher ID.
 *
 * Deliberately free of any `astro:env` import so it can be unit tested: Vitest
 * runs without Astro's Vite plugin, and a bare `astro:env/client` import fails
 * to resolve there. The virtual module is read in `env.ts` instead, which does
 * nothing but hand its value to `resolveAds`. All the behaviour worth testing
 * lives here.
 */

export interface AdsConfig {
  /** False whenever the publisher ID is missing. Nothing renders when false. */
  readonly enabled: boolean;
  readonly client: string;
}

const DISABLED: AdsConfig = { enabled: false, client: '' };

/**
 * Auto ads need only the publisher ID. Placement and formats are controlled in
 * the AdSense dashboard, not in code — loading the script is the entire
 * integration. An empty ID ships an ad-free site rather than a broken loader.
 */
export function resolveAds(client?: string): AdsConfig {
  const clientId = normalizeClient(client);

  if (!clientId) return DISABLED;

  return { enabled: true, client: clientId };
}

/**
 * The single line an AdSense publisher's ads.txt needs.
 *
 * Note the ID is emitted as `pub-...`, not `ca-pub-...`. The two formats are
 * not interchangeable and the distinction is invisible: `data-ad-client` wants
 * the `ca-` prefix, ads.txt rejects it. An ads.txt carrying the wrong form
 * parses as having no authorised sellers at all, which suppresses bidding
 * rather than erroring anywhere you would notice.
 *
 * The trailing ID is Google's own fixed certification-authority ID, identical
 * for every AdSense publisher.
 */
export function adsTxtLine(client: string): string {
  return `google.com, ${client.replace(/^ca-/, '')}, DIRECT, f08c47fec0942fa0`;
}

/**
 * `data-ad-client` must carry the `ca-pub-` prefix, but the AdSense dashboard
 * shows the ID in several places without it. Pasting the bare number is the
 * single most common setup mistake, and it fails silently -- the script loads,
 * the unit never fills, and there is nothing in the console to explain why.
 *
 * Prefixing is unambiguous enough to do automatically: no valid publisher ID is
 * a bare number that should have stayed bare.
 */
function normalizeClient(client?: string): string {
  const value = client?.trim() ?? '';
  if (!value) return '';
  if (value.startsWith('ca-pub-')) return value;
  if (value.startsWith('pub-')) return `ca-${value}`;
  return `ca-pub-${value}`;
}
