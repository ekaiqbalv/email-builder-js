/**
 * @jest-environment node
 */

import renderToStaticMarkup from './renderToStaticMarkup';

describe('renderToStaticMarkup', () => {
  beforeEach(() => {
    global.window = {
      document: {
        querySelectorAll: jest.fn().mockReturnValue([]),
      },
    } as any;
  });

  it('renders into a string', () => {
    const result = renderToStaticMarkup(
      {
        root: {
          type: 'Container',
          data: {
            props: {
              childrenIds: [],
            },
          },
        },
      },
      { rootBlockId: 'root' }
    );
    expect(result).toMatchSnapshot();
  });
});
