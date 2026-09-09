/** Shared prop types. Kept in a .ts file so both .astro and .ts can import them. */

export type IconName =
  | 'github'
  | 'rss'
  | 'home'
  | 'book'
  | 'post'
  | 'tool'
  | 'sun'
  | 'moon'
  | 'monitor'
  | 'arrowRight'
  | 'arrowUp'
  | 'menu'
  | 'close'
  | 'clock'
  | 'link'
  | 'location';

export interface Crumb {
  label: string;
  href?: string;
  icon?: IconName;
}

/**
 * Handbook page maturity and blog post stage share one three-step scale, so a
 * reader learns the signal once. `stage.css` styles by level, not by label.
 */
export type StageLevel = 'early' | 'mid' | 'done';

export const HANDBOOK_STATUS_LEVEL: Record<string, StageLevel> = {
  stub: 'early',
  working: 'mid',
  settled: 'done',
};

export const POST_STAGE_LEVEL: Record<string, StageLevel> = {
  seedling: 'early',
  budding: 'mid',
  evergreen: 'done',
};
