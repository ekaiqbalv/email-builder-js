export const BREAKPOINTS = {
  xs: 0,
  sm: 640,
  md: 1024,
  lg: 1200,
};

export type Breakpoint = keyof typeof BREAKPOINTS;

export const mediaQuery = (breakpoint: Breakpoint, styles: Record<string, string>) => {
  const styleString = Object.entries(styles)
    .map(([key, value]) => `${key}: ${value} !important;`)
    .join(' ');

  if (breakpoint === 'xs') {
    return styleString.replace(/\s*!important/g, '');
  }
  return `
    @media (min-width: ${BREAKPOINTS[breakpoint]}px) {
      ${styleString}
    }
  `;
};

export const generateResponsiveStyles = (styles: Partial<Record<Breakpoint, Record<string, string>>>) => {
  return Object.entries(styles)
    .map(([breakpoint, style]) => mediaQuery(breakpoint as Breakpoint, style || {}))
    .join('\n');
};
