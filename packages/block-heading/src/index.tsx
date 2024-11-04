/** @jsxRuntime automatic */
/** @jsxImportSource @emotion/react */
import { CSSProperties } from 'react';
import { z } from 'zod';

import { css } from '@emotion/react';
import { generateResponsiveStyles } from '@usewaypoint/shared';

const COLOR_SCHEMA = z
  .string()
  .regex(/^#[0-9a-fA-F]{6}$/)
  .nullable()
  .optional();

const PADDING_SCHEMA = z
  .object({
    top: z.number(),
    bottom: z.number(),
    right: z.number(),
    left: z.number(),
  })
  .optional()
  .nullable();

const getPadding = (padding: z.infer<typeof PADDING_SCHEMA>) =>
  padding ? `${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px` : undefined;

const FONT_FAMILY_SCHEMA = z
  .enum([
    'MODERN_SANS',
    'BOOK_SANS',
    'ORGANIC_SANS',
    'GEOMETRIC_SANS',
    'HEAVY_SANS',
    'ROUNDED_SANS',
    'MODERN_SERIF',
    'BOOK_SERIF',
    'MONOSPACE',
  ])
  .nullable()
  .optional();

function getFontFamily(fontFamily: z.infer<typeof FONT_FAMILY_SCHEMA>) {
  switch (fontFamily) {
    case 'MODERN_SANS':
      return '"Helvetica Neue", "Arial Nova", "Nimbus Sans", Arial, sans-serif';
    case 'BOOK_SANS':
      return 'Optima, Candara, "Noto Sans", source-sans-pro, sans-serif';
    case 'ORGANIC_SANS':
      return 'Seravek, "Gill Sans Nova", Ubuntu, Calibri, "DejaVu Sans", source-sans-pro, sans-serif';
    case 'GEOMETRIC_SANS':
      return 'Avenir, "Avenir Next LT Pro", Montserrat, Corbel, "URW Gothic", source-sans-pro, sans-serif';
    case 'HEAVY_SANS':
      return 'Bahnschrift, "DIN Alternate", "Franklin Gothic Medium", "Nimbus Sans Narrow", sans-serif-condensed, sans-serif';
    case 'ROUNDED_SANS':
      return 'ui-rounded, "Hiragino Maru Gothic ProN", Quicksand, Comfortaa, Manjari, "Arial Rounded MT Bold", Calibri, source-sans-pro, sans-serif';
    case 'MODERN_SERIF':
      return 'Charter, "Bitstream Charter", "Sitka Text", Cambria, serif';
    case 'BOOK_SERIF':
      return '"Iowan Old Style", "Palatino Linotype", "URW Palladio L", P052, serif';
    case 'MONOSPACE':
      return '"Nimbus Mono PS", "Courier New", "Cutive Mono", monospace';
  }
  return undefined;
}

export const HeadingPropsSchema = z.object({
  props: z
    .object({
      text: z.string().optional().nullable(),
      level: z.enum(['h1', 'h2', 'h3']).optional().nullable(),
    })
    .optional()
    .nullable(),
  style: z
    .object({
      color: COLOR_SCHEMA,
      backgroundColor: COLOR_SCHEMA,
      fontFamily: FONT_FAMILY_SCHEMA,
      fontWeight: z.enum(['bold', 'normal']).optional().nullable(),
      textAlign: z.enum(['left', 'center', 'right']).optional().nullable(),
      padding: PADDING_SCHEMA,
    })
    .optional()
    .nullable(),
});

export type HeadingProps = z.infer<typeof HeadingPropsSchema>;

export const HeadingPropsDefaults = {
  level: 'h2',
  text: '',
} as const;

export function Heading({ props, style }: HeadingProps) {
  const level = props?.level ?? HeadingPropsDefaults.level;
  const text = props?.text ?? HeadingPropsDefaults.text;
  const hStyle: CSSProperties = {
    color: style?.color ?? undefined,
    backgroundColor: style?.backgroundColor ?? undefined,
    fontWeight: style?.fontWeight ?? 'bold',
    textAlign: style?.textAlign ?? undefined,
    margin: 0,
    fontFamily: getFontFamily(style?.fontFamily),
    padding: getPadding(style?.padding),
  };
  switch (level) {
    case 'h1':
      return (
        <h1 css={getFontSize(level)} style={hStyle}>
          {text}
        </h1>
      );
    case 'h2':
      return (
        <h2 css={getFontSize(level)} style={hStyle}>
          {text}
        </h2>
      );
    case 'h3':
      return (
        <h3 css={getFontSize(level)} style={hStyle}>
          {text}
        </h3>
      );
  }
}

const FONT_SIZES = {
  h1: {
    xs: '24px',
    sm: '26px',
    md: '30px',
    lg: '32px',
  },
  h2: {
    xs: '20px',
    sm: '20px',
    md: '24px',
    lg: '24px',
  },
  h3: {
    xs: '18px',
    sm: '19px',
    md: '20px',
    lg: '20px',
  },
} as const;

function getFontSize(level: 'h1' | 'h2' | 'h3') {
  return css`
    ${generateResponsiveStyles({
      xs: { 'font-size': FONT_SIZES[level].xs },
      sm: { 'font-size': FONT_SIZES[level].sm },
      md: { 'font-size': FONT_SIZES[level].md },
      lg: { 'font-size': FONT_SIZES[level].lg },
    })}
  `;
}
