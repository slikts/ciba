/** @jsx jsx */
import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import { produce } from 'immer';
import preset from '@rebass/preset';
import { Global, jsx, css } from '@emotion/core';
import Reader from './Reader';

const App = () => {
  const theme: any = produce(preset, (draft: any) => {
    draft.colors.background = '#222';
    draft.colors.text = '#d3d3d3';
  });

  return (
    <React.Fragment>
      <Global
        styles={css`
          :root {
            background: ${theme.colors.background};
            color: ${theme.colors.text};
          }
          a {
            color: ${theme.colors.primary};
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
