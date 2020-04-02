/** @jsx jsx */
import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import { produce } from 'immer';
import preset from '@rebass/preset';
import { Global, jsx, css } from '@emotion/core';
import emotionReset from 'emotion-reset';
import Reader from './Reader';

const App = () => {
  const theme: any = produce(preset, (draft: any) => {
    draft.colors.background = '#18191a';
    draft.colors.text = '#d3d3d3';
    draft.fontSizes.shift();
    // draft.fontSizes = draft.fontSizes.map((n: number) => {
    //   return n + 1;
    // });
    draft.lineHeights.body = 1.33;
  });

  console.log(theme);

  return (
    <React.Fragment>
      <Global
        styles={css`
          ${emotionReset} body {
            background: ${theme.colors.background};
            color: ${theme.colors.text};
            font-size: ${theme.fontSizes[1]}px;
            font-family: Segoe UI, Helvetica, Arial, sans-serif;
            line-height: ${theme.lineHeights.body};
          }
          a {
            color: ${theme.colors.primary};
          }
          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            line-height: ${theme.lineHeights.heading};
            font-weight: bold;
          }
        `}
      />
      <ThemeProvider theme={theme}>
        <div
          css={css`
            display: flex;
            justify-content: center;
          `}
        >
          <Reader />
        </div>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default App;
