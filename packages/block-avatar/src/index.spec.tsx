import React from 'react';

import { matchers } from '@emotion/jest';
import { render } from '@testing-library/react';
import { BREAKPOINTS } from '@usewaypoint/shared';

import { Avatar } from '.';

expect.extend(matchers);

describe('Avatar', () => {
  it('applies responsive sizes correctly', () => {
    const { getByAltText } = render(
      <Avatar
        props={{
          size: 100,
          imageUrl: 'test.jpg',
          alt: 'test avatar',
        }}
      />
    );
    expect(getByAltText('test avatar')).toHaveStyleRule('width', '45px');
    expect(getByAltText('test avatar')).toHaveStyleRule('width', '65px!important', {
      media: `(min-width: ${BREAKPOINTS.sm}px)`,
    });
    expect(getByAltText('test avatar')).toHaveStyleRule('width', '85px!important', {
      media: `(min-width: ${BREAKPOINTS.md}px)`,
    });
    expect(getByAltText('test avatar')).toHaveStyleRule('width', '100px!important', {
      media: `(min-width: ${BREAKPOINTS.lg}px)`,
    });
    expect(getByAltText('test avatar')).toHaveStyleRule('height', '45px');
    expect(getByAltText('test avatar')).toHaveStyleRule('height', '65px!important', {
      media: `(min-width: ${BREAKPOINTS.sm}px)`,
    });
    expect(getByAltText('test avatar')).toHaveStyleRule('height', '85px!important', {
      media: `(min-width: ${BREAKPOINTS.md}px)`,
    });
    expect(getByAltText('test avatar')).toHaveStyleRule('height', '100px!important', {
      media: `(min-width: ${BREAKPOINTS.lg}px)`,
    });
  });
});
