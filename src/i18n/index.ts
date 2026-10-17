// UI localization. Every user-facing string the theme itself renders comes from
// a dictionary here; `SITE.locale` in `src/consts.ts` picks which one, and also
// drives `<html lang>`, date formatting, and the RSS feed language.
//
// To add a locale: copy `ja.ts`, translate the values, and register it in
// `DICTIONARIES` below. Nothing else needs editing.
import { SITE, type NavItem } from '../consts';
import { en, type UIKey, type UIStrings } from './en';
import { it } from './it';
import { ja } from './ja';
import { pt } from './pt';

export type { UIKey, UIStrings };

/** Fallback used when `SITE.locale` has no dictionary. */
export const DEFAULT_LOCALE = 'en';

export const SUPPORTED_LOCALES = ['en', 'pt', 'it'] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];
export const PREFIXED_LOCALES = ['pt', 'it'] as const satisfies readonly Locale[];

/** Registered dictionaries, keyed by BCP 47 language tag. */
export const DICTIONARIES: Record<string, UIStrings> = { en, it, ja, pt };

/** The active locale, straight from `SITE.locale`. Also the value passed to
 *  `Intl`, `<html lang>`, and the RSS `<language>` element. */
export const locale: Locale = SITE.locale;

// `en-GB` falls back to the `en` dictionary while still formatting dates as
// `en-GB` — a regional variant rarely needs its own copy of every string.
const resolveDictionary = (tag: string): UIStrings =>
  DICTIONARIES[tag] ?? DICTIONARIES[tag.split('-')[0]] ?? DICTIONARIES[DEFAULT_LOCALE];

/** The active dictionary. Exported mainly for tests and debugging — prefer `t()`. */
export const strings: UIStrings = resolveDictionary(locale);

export const isLocale = (value: string): value is Locale =>
  SUPPORTED_LOCALES.includes(value as Locale);

export const getTranslator = (tag: string) => {
  const dictionary = resolveDictionary(tag);
  return (key: UIKey, params?: Record<string, string | number>): string => {
    const value = dictionary[key];
    if (!params) return value;
    return value.replace(/\{(\w+)\}/g, (match, name: string) =>
      name in params ? String(params[name]) : match,
    );
  };
};

/**
 * Look up a UI string, filling `{name}` placeholders from `params`.
 * Unknown keys are impossible: `UIKey` is derived from the English dictionary.
 */
export const t = getTranslator(locale);

/**
 * Render a post's reading time.
 *
 * `remarkPluginFrontmatter` is untyped, and the Content Layer store in
 * `node_modules/.astro/` survives an upgrade — so `minutesRead` may still be
 * the preformatted `"3 min read"` string this theme used to emit. Interpolating
 * that into `post.readingTime` would print "3 min read min read"; going the
 * other way would print a bare "3". Passing an unexpected value straight
 * through degrades to readable-but-untranslated text until the store is
 * rebuilt, instead of showing either kind of garbage.
 */
export const readingTime = (minutesRead: unknown): string =>
  typeof minutesRead === 'number'
    ? t('post.readingTime', { minutes: minutesRead })
    : String(minutesRead ?? '');

export const readingTimeFor = (minutesRead: unknown, tag: string): string => {
  const translate = getTranslator(tag);
  return typeof minutesRead === 'number'
    ? translate('post.readingTime', { minutes: minutesRead })
    : String(minutesRead ?? '');
};

/** Format a publish date in the active locale. `long` spells the month out;
 *  `short` abbreviates it. Both are locale-aware, including field order. */
export const formatDate = (date: Date, style: 'long' | 'short' = 'long'): string =>
  new Intl.DateTimeFormat(locale, {
    month: style,
    day: 'numeric',
    year: 'numeric',
  }).format(date);

export const formatDateFor = (date: Date, tag: string, style: 'long' | 'short' = 'long'): string =>
  new Intl.DateTimeFormat(tag, {
    month: style,
    day: 'numeric',
    year: 'numeric',
  }).format(date);

/** Resolve a nav entry's label. `NavItem` requires exactly one of `label` or
 *  `labelKey`, so there is no unlabelled case to fall back from. */
export const navLabel = (item: NavItem): string =>
  item.label !== undefined ? item.label : t(item.labelKey);

export const navLabelFor = (item: NavItem, tag: string): string =>
  item.label !== undefined ? item.label : getTranslator(tag)(item.labelKey);
