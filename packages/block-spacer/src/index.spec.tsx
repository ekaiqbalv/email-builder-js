import React from 'react';

import { matchers } from '@emotion/jest';
import { render } from '@testing-library/react';
import { BREAKPOINTS } from '@usewaypoint/shared';

import { Spacer } from '.';

expect.extend(matchers);

describe('Spacer', () => {
  it('renders with default values', () => {
    expect(render(<Spacer />).asFragment()).toMatchSnapshot();
  });

  it('renders with props', () => {
    expect(render(<Spacer props={{ height: 10 }} />).asFragment()).toMatchSnapshot();
  });

  it('applies responsive heights correctly', () => {
    const { container } = render(<Spacer props={{ height: 20 }} />);
    expect(container.firstChild).toHaveStyleRule('height', '16px');
    expect(container.firstChild).toHaveStyleRule('height', '17px!important', {
      media: `(min-width: ${BREAKPOINTS.sm}px)`,
    });
    expect(container.firstChild).toHaveStyleRule('height', '19px!important', {
      media: `(min-width: ${BREAKPOINTS.md}px)`,
    });
    expect(container.firstChild).toHaveStyleRule('height', '20px!important', {
      media: `(min-width: ${BREAKPOINTS.lg}px)`,
    });
  });
});
