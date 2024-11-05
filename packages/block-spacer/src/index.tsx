/** @jsxRuntime automatic */
/** @jsxImportSource @emotion/react */
import { useMemo } from 'react';
import { z } from 'zod';

import { css } from '@emotion/react';
import { generateResponsiveStyles } from '@usewaypoint/shared';

export const SpacerPropsSchema = z.object({
  props: z
    .object({
      height: z.number().gte(0).optional().nullish(),
    })
    .optional()
    .nullable(),
});

export type SpacerProps = z.infer<typeof SpacerPropsSchema>;

export const SpacerPropsDefaults = {
  height: 16,
};

const SIZE_RATIOS = {
  xs: 0.8,
  sm: 0.85,
  md: 0.95,
  lg: 1,
};

const calculateResponsiveHeight = (desktopSize: number) => ({
  xs: `${Math.round(desktopSize * SIZE_RATIOS.xs)}px`,
  sm: `${Math.round(desktopSize * SIZE_RATIOS.sm)}px`,
  md: `${Math.round(desktopSize * SIZE_RATIOS.md)}px`,
  lg: `${desktopSize}px`,
});

export function Spacer({ props }: SpacerProps) {
  const height = props?.height ?? SpacerPropsDefaults.height;
  const responsiveHeights = useMemo(() => calculateResponsiveHeight(height), [height]);
  const heightCss = useMemo(
    () => css`
      ${generateResponsiveStyles({
        xs: { height: responsiveHeights.xs },
        sm: { height: responsiveHeights.sm },
        md: { height: responsiveHeights.md },
        lg: { height: responsiveHeights.lg },
      })}
    `,
    [responsiveHeights]
  );

  return <div css={heightCss} />;
}
