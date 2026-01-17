/**
 * Common spacing values (divisible by 4, in rem)
 */
export const SPACING = {
  0: '0',
  1: '0.0625rem',   // 1px
  2: '0.125rem',    // 2px
  3: '0.1875rem',   // 3px
  4: '0.25rem',     // 4px
  6: '0.375rem',    // 6px
  8: '0.5rem',      // 8px
  10: '0.625rem',   // 10px
  12: '0.75rem',    // 12px
  14: '0.875rem',   // 14px
  16: '1rem',       // 16px
  20: '1.25rem',    // 20px
  24: '1.5rem',     // 24px
  32: '2rem',       // 32px
  40: '2.5rem',     // 40px
  48: '3rem',       // 48px
  64: '4rem',       // 64px
  96: '6rem',       // 96px
  128: '8rem',      // 128px
} as const;

/**
 * Common breakpoint values (px, for use in media queries)
 */
export const BREAKPOINTS = {
  sm: 400,
  md: 640,
  lg: 768,
  xl: 1024,
  '2xl': 1280,
} as const;

/**
 * Common z-index values
 */
export const Z_INDEX = {
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  modal: 40,
  tooltip: 50,
} as const;

/**
 * Common size values (multiplier for rem)
 */
export const SIZES = {
  xs: 0.75,      // 12px
  sm: 0.875,     // 14px
  base: 1,       // 16px
  lg: 1.125,     // 18px
  xl: 1.25,      // 20px
  '2xl': 1.5,    // 24px
  '3xl': 1.875,  // 30px
  '4xl': 2.25,   // 36px
} as const;

/**
 * Border radius values
 */
export const BORDER_RADIUS = {
  none: '0',
  sm: '0.125rem',
  DEFAULT: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  full: '9999px',
} as const;
