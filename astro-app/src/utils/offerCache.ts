import { getAllTilbud, getTilbudByCompany } from "./sanity";
import type { Tilbud } from "./sanity";

// Cache for all offers
let allTilbudCache: Tilbud[] | null = null;

// Cache for company-specific offers
const companyTilbudCache = new Map<string, Tilbud[]>();

/**
 * Get all offers with caching at build time
 * This function will only fetch from Sanity once during the build process
 */
export async function getCachedAllTilbud(): Promise<Tilbud[]> {
  if (allTilbudCache === null) {
    console.log("🔍 Fetching all offers from Sanity (build time)...");
    allTilbudCache = await getAllTilbud();
    console.log(`✅ Cached ${allTilbudCache.length} offers`);
  }
  return allTilbudCache;
}

/**
 * Get offers for a specific company with caching at build time
 * This function will only fetch from Sanity once per company during the build process
 */
export async function getCachedTilbudByCompany(
  companySlug: string
): Promise<Tilbud[]> {
  if (!companyTilbudCache.has(companySlug)) {
    console.log(
      `🔍 Fetching offers for company ${companySlug} from Sanity (build time)...`
    );
    const tilbud = await getTilbudByCompany(companySlug);
    companyTilbudCache.set(companySlug, tilbud);
    console.log(`✅ Cached ${tilbud.length} offers for ${companySlug}`);
  }
  return companyTilbudCache.get(companySlug) || [];
}

/**
 * Clear all caches (useful for testing or if you need to force refresh)
 */
export function clearOfferCache(): void {
  allTilbudCache = null;
  companyTilbudCache.clear();
  console.log("🧹 Offer cache cleared");
}
