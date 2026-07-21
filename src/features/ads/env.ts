import { PUBLIC_ADSENSE_CLIENT, PUBLIC_ADSENSE_SLOT } from 'astro:env/client';
import { resolveAds } from './config';

/**
 * The resolved configuration, shared by every ad component.
 *
 * The entire purpose of this file is to keep the `astro:env/client` import in
 * one place: it is a virtual module, so anything importing it can only run
 * inside an Astro build. `config.ts` stays plain TypeScript and stays testable.
 *
 * Resolved once at module scope rather than per component. This is a static
 * build, so the values are compile-time constants and `enabled` collapses to a
 * literal -- when it is false, the markup guarded by it is never emitted.
 */
export const ads = resolveAds(PUBLIC_ADSENSE_CLIENT, PUBLIC_ADSENSE_SLOT);
