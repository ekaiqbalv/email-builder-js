import React from 'react';

import { matchers } from '@emotion/jest';
import { render } from '@testing-library/react';
import { BREAKPOINTS } from '@usewaypoint/shared';

import { Heading } from '.';

expect.extend(matchers);

describe('Heading', () => {
  it('applies responsive sizes correctly for h1', () => {
    const { getByText } = render(<Heading props={{ text: 'test Heading', level: 'h1' }} />);
    expect(getByText('test Heading')).toHaveStyleRule('font-size', '24px');
    expect(getByText('test Heading')).toHaveStyleRule('font-size', '26px!important', {
      media: `(min-width: ${BREAKPOINTS.sm}px)`,
    });
    expect(getByText('test Heading')).toHaveStyleRule('font-size', '30px!important', {
      media: `(min-width: ${BREAKPOINTS.md}px)`,
    });
    expect(getByText('test Heading')).toHaveStyleRule('font-size', '32px!important', {
      media: `(min-width: ${BREAKPOINTS.lg}px)`,
    });
  });

  it('applies responsive sizes correctly for h2', () => {
    const { getByText } = render(<Heading props={{ text: 'test Heading', level: 'h2' }} />);
    expect(getByText('test Heading')).toHaveStyleRule('font-size', '20px');
    expect(getByText('test Heading')).toHaveStyleRule('font-size', '20px!important', {
      media: `(min-width: ${BREAKPOINTS.sm}px)`,
    });
    expect(getByText('test Heading')).toHaveStyleRule('font-size', '24px!important', {
      media: `(min-width: ${BREAKPOINTS.md}px)`,
    });
    expect(getByText('test Heading')).toHaveStyleRule('font-size', '24px!important', {
      media: `(min-width: ${BREAKPOINTS.lg}px)`,
    });
  });

  it('applies responsive sizes correctly for h3', () => {
    const { getByText } = render(<Heading props={{ text: 'test Heading', level: 'h3' }} />);
    expect(getByText('test Heading')).toHaveStyleRule('font-size', '18px');
    expect(getByText('test Heading')).toHaveStyleRule('font-size', '19px!important', {
      media: `(min-width: ${BREAKPOINTS.sm}px)`,
    });
    expect(getByText('test Heading')).toHaveStyleRule('font-size', '20px!important', {
      media: `(min-width: ${BREAKPOINTS.md}px)`,
    });
    expect(getByText('test Heading')).toHaveStyleRule('font-size', '20px!important', {
      media: `(min-width: ${BREAKPOINTS.lg}px)`,
    });
  });
});
