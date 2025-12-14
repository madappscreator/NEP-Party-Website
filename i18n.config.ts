export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'ta', 'hi', 'te', 'ml', 'kn'],
} as const;

export type Locale = typeof i18n['locales'][number];
