import React from 'react';
import { renderToStaticMarkup as baseRenderToStaticMarkup } from 'react-dom/server';

import Reader, { TReaderDocument } from '../Reader/core';
import {
  collectEmailStyles,
  extractEmailClassNames,
  mergeEmailStyles,
  organizeEmailStylesByMedia,
} from '../utils/email-style';

type TOptions = {
  rootBlockId: string;
};
export default function renderToStaticMarkup(document: TReaderDocument, { rootBlockId }: TOptions) {
  const styleElements = window.document.querySelectorAll('[data-emotion]');
  const bodyContent = baseRenderToStaticMarkup(<Reader document={document} rootBlockId={rootBlockId} />);

  const uniqueClassNames = extractEmailClassNames(bodyContent);
  const styles = collectEmailStyles(styleElements, uniqueClassNames);
  const styleGroups = organizeEmailStylesByMedia(styles);
  const combinedStyles = mergeEmailStyles(styleGroups);

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>${combinedStyles}</style>
      </head>
      <body>${bodyContent}</body>
    </html>
  `;
}
