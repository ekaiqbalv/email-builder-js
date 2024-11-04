import { BREAKPOINTS, generateResponsiveStyles, mediaQuery } from './responsive';

describe('responsive utils', () => {
  describe('mediaQuery', () => {
    it('returns styles without media query for xs breakpoint', () => {
      const styles = {
        color: 'red',
        padding: '10px',
      };

      const result = mediaQuery('xs', styles);
      expect(result).toBe('color: red; padding: 10px;');
    });

    it('wraps styles in media query for non-xs breakpoints', () => {
      const styles = {
        color: 'blue',
        margin: '20px',
      };

      const result = mediaQuery('md', styles);
      expect(result.replace(/\s+/g, ' ').trim()).toBe(
        `@media (min-width: ${BREAKPOINTS.md}px) { color: blue !important; margin: 20px !important; }`
      );
    });
  });

  describe('generateResponsiveStyles', () => {
    it('generates combined responsive styles for multiple breakpoints', () => {
      const styles = {
        xs: { color: 'red' },
        md: { color: 'blue' },
        lg: { color: 'green' },
      };

      const result = generateResponsiveStyles(styles);
      const normalizedResult = result.replace(/\s+/g, ' ').trim();

      expect(normalizedResult).toBe(
        [
          'color: red;',
          `@media (min-width: ${BREAKPOINTS.md}px) { color: blue !important; }`,
          `@media (min-width: ${BREAKPOINTS.lg}px) { color: green !important; }`,
        ].join(' ')
      );
    });

    it('handles empty or undefined styles', () => {
      const styles = {
        xs: undefined,
        md: {},
      };

      const result = generateResponsiveStyles(styles);
      const normalizedResult = result.replace(/\s+/g, ' ').trim();
      expect(normalizedResult).toBe('@media (min-width: 1024px) { }');
    });
  });
});
