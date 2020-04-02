/** @jsx jsx */
import { memo } from 'react';
import { jsx, css } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import linkify from 'linkifyjs/html';

import Distance from './Distance';
import { Post as PostModel } from '../db';
import { sanitizeContent } from '../util';

import User from './User';

const Post = ({ url, title, user, content, date }: PostModel) => {
  const theme = useTheme<any>();

  return (
    <div
      css={css`
        background: #242526;
        border-radius: ${theme.radii.default}px;
        margin: ${theme.space[2]}px 0;
      `}
    >
      <div
        css={css`
          background: rgba(255, 255, 255, 0.05);
          padding: ${theme.space[1] / 2}px ${theme.space[2]}px ${theme.space[1]}px;
          font-size: ${theme.fontSizes[0]}px;
          border-radius: ${theme.radii.default}px ${theme.radii.default}px 0 0;
        `}
      >
        <User user={user} />
        &nbsp;
        <a
          href={url}
          css={css`
            &:not(:hover) {
              text-decoration: inherit;
              color: ${theme.colors.text};
            }
          `}
          target="_blank"
          rel="noreferrer noopener"
        >
          <Distance date={date} />
        </a>
      </div>
      {title && (
        <h2
          css={css`
            font-size: ${theme.fontSizes[1]}px;
            padding: ${theme.space[1]}px ${theme.space[2]}px;
          `}
        >
          {title}
        </h2>
      )}
      <div
        css={css`
          padding: ${theme.space[2]}px;
        `}
      >
        <div
          css={css`
            max-height: ${theme.lineHeights.body * 2 * theme.fontSizes[1]}px;
            overflow: hidden;
            text-overflow: ellipsis;
          `}
          {...sanitizeContent(linkify(content))}
        />
      </div>
    </div>
  );
};

export default memo(Post);
