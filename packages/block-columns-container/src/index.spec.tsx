import React from 'react';

import { matchers } from '@emotion/jest';
import { render } from '@testing-library/react';
import { BREAKPOINTS } from '@usewaypoint/shared';

import { ColumnsContainer } from '.';

expect.extend(matchers);

describe('block-columns-container', () => {
  it('renders with default values', () => {
    expect(render(<ColumnsContainer />).asFragment()).toMatchSnapshot();
  });

  const testColumnLayout = (columnsCount: 2 | 3) => {
    const sampleColumns = [<>bread</>, <>tomato</>, <>lettuce</>];
    const paddingConfig = {
      2: {
        left: ['0px', '6px'],
        right: ['6px', '0px'],
      },
      3: {
        left: ['0px', '4px', '8px'],
        right: ['8px', '4px', '0px'],
      },
    };

    describe(`columnsCount ${columnsCount}`, () => {
      it('renders column children', () => {
        expect(
          render(<ColumnsContainer props={{ columnsCount }} columns={sampleColumns} />).asFragment()
        ).toMatchSnapshot();
      });

      it('applies correct styles', () => {
        const { container } = render(
          <ColumnsContainer
            props={{
              columnsGap: 12,
              columnsCount,
            }}
            columns={sampleColumns}
          />
        );

        const tdElements = container.querySelectorAll('td');
        const mediaQuery = `(min-width: ${BREAKPOINTS.sm}px)`;
        const config = paddingConfig[columnsCount];

        tdElements.forEach((td, index) => {
          expect(td).toHaveStyleRule('display', 'block');
          expect(td).toHaveStyleRule('display', 'table-cell!important', { media: mediaQuery });

          expect(td).toHaveStyleRule('padding-bottom', index === tdElements.length - 1 ? 'none' : '12px');

          expect(td).toHaveStyleRule('padding-bottom', '0px!important', { media: mediaQuery });
          expect(td).toHaveStyleRule('padding-left', `${config.left[index]}!important`, { media: mediaQuery });
          expect(td).toHaveStyleRule('padding-right', `${config.right[index]}!important`, { media: mediaQuery });
        });
      });
    });
  };

  testColumnLayout(2);
  testColumnLayout(3);
});
