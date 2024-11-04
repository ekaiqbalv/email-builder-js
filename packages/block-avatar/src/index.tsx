/** @jsxRuntime automatic */
/** @jsxImportSource @emotion/react */
import { CSSProperties, useMemo } from 'react';
import { z } from 'zod';

import { css } from '@emotion/react';
import { generateResponsiveStyles } from '@usewaypoint/shared';

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

export const AvatarPropsSchema = z.object({
  style: z
    .object({
      textAlign: z.enum(['left', 'center', 'right']).optional().nullable(),
      padding: PADDING_SCHEMA,
    })
    .optional()
    .nullable(),
  props: z
    .object({
      size: z.number().gt(0).optional().nullable(),
      shape: z.enum(['circle', 'square', 'rounded']).optional().nullable(),
      imageUrl: z.string().optional().nullable(),
      alt: z.string().optional().nullable(),
    })
    .optional()
    .nullable(),
});

export type AvatarProps = z.infer<typeof AvatarPropsSchema>;

function getBorderRadius(shape: 'circle' | 'square' | 'rounded', size: number): number | undefined {
  switch (shape) {
    case 'rounded':
      return size * 0.125;
    case 'circle':
      return size;
    case 'square':
    default:
      return undefined;
  }
}

export const AvatarPropsDefaults = {
  size: 64,
  imageUrl: '',
  alt: '',
  shape: 'square',
} as const;

const SIZE_RATIOS = {
  xs: 0.45,
  sm: 0.65,
  md: 0.85,
  lg: 1,
};

const calculateResponsiveSizes = (desktopSize: number) => ({
  xs: `${Math.round(desktopSize * SIZE_RATIOS.xs)}px`,
  sm: `${Math.round(desktopSize * SIZE_RATIOS.sm)}px`,
  md: `${Math.round(desktopSize * SIZE_RATIOS.md)}px`,
  lg: `${desktopSize}px`,
});

export function Avatar({ style, props }: AvatarProps) {
  const size = props?.size ?? AvatarPropsDefaults.size;
  const imageUrl = props?.imageUrl ?? AvatarPropsDefaults.imageUrl;
  const alt = props?.alt ?? AvatarPropsDefaults.alt;
  const shape = props?.shape ?? AvatarPropsDefaults.shape;

  const sectionStyle: CSSProperties = {
    textAlign: style?.textAlign ?? undefined,
    padding: getPadding(style?.padding),
  };

  const responsiveSizes = useMemo(() => calculateResponsiveSizes(size), [size]);

  const imageCss = useMemo(
    () => css`
      ${generateResponsiveStyles({
        xs: { height: responsiveSizes.xs, width: responsiveSizes.xs },
        sm: { height: responsiveSizes.sm, width: responsiveSizes.sm },
        md: { height: responsiveSizes.md, width: responsiveSizes.md },
        lg: { height: responsiveSizes.lg, width: responsiveSizes.lg },
      })}
    `,
    [responsiveSizes]
  );

  return (
    <div style={sectionStyle}>
      <img
        alt={alt}
        src={imageUrl}
        height={size}
        width={size}
        css={imageCss}
        style={{
          outline: 'none',
          border: 'none',
          textDecoration: 'none',
          objectFit: 'cover',
          maxWidth: '100%',
          display: 'inline-block',
          verticalAlign: 'middle',
          textAlign: 'center',
          borderRadius: getBorderRadius(shape, size),
        }}
      />
    </div>
  );
}
