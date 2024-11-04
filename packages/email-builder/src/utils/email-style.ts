type StyleGroups = { [key: string]: string[] };

export function extractEmailClassNames(html: string): string[] {
  const classNames = [...html.matchAll(/class="(css-[^"\s]*)/g)].map((match) => match[1]);
  return [...new Set(classNames)];
}

export function collectEmailStyles(styleElements: NodeListOf<Element>, uniqueClassNames: string[]): string[] {
  return Array.from(styleElements)
    .flatMap((element) => {
      const styleSheet = (element as HTMLStyleElement).sheet;
      return styleSheet ? [...styleSheet.cssRules].map((rules) => rules.cssText) : [];
    })
    .filter((styleText) => uniqueClassNames.some((className) => styleText.includes(className)));
}

export function organizeEmailStylesByMedia(styles: string[]): StyleGroups {
  const styleGroups: StyleGroups = { base: [] };

  styles.forEach((style) => {
    const mediaQueryMatch = style.match(/@media[^{]+\{([\s\S]+)\}/);
    if (mediaQueryMatch) {
      const mediaQuery = style.match(/@media[^{]+/)?.[0] ?? '';
      styleGroups[mediaQuery] = styleGroups[mediaQuery] || [];
      styleGroups[mediaQuery].push(mediaQueryMatch[1].trim());
    } else {
      styleGroups.base.push(style);
    }
  });

  return styleGroups;
}

export function mergeEmailStyles(styleGroups: StyleGroups): string {
  return [
    ...styleGroups.base,
    ...Object.entries(styleGroups)
      .filter(([key]) => key !== 'base')
      .map(
        ([mediaQuery, styles]) =>
          `${mediaQuery} {
          ${styles.join('\n')}
        }`
      ),
  ]
    .join('\n')
    .replace(/\s+/g, ' ');
}
