/** @jsx jsx */
import { memo, useCallback } from 'react';
import { jsx, css } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import linkify from 'linkifyjs/html';

import Distance from './Distance';
import { Post as PostModel } from '../db';
import { sanitizeContent } from '../util';

import User from './User';

const Post = ({ url, title, user, content, date, rows = 3, isFocused, toggleFocus }: Props) => {
  const theme = useTheme<any>();

  const handleFocus = useCallback(() => {
    toggleFocus(url);
  }, [toggleFocus, url]);

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
          position: relative;
          padding: ${theme.space[2]}px;
        `}
      >
        <div
          css={css`
            overflow: hidden;
            text-overflow: ellipsis;
            ${!isFocused &&
            css`
              max-height: ${theme.lineHeights.body * rows * theme.fontSizes[1]}px;
            `}
          `}
          {...sanitizeContent(linkify(content))}
        />
        <button
          onClick={handleFocus}
          css={css`
            background: transparent;
            border-style: none;
            cursor: pointer;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            outline: none;
            ${isFocused &&
            css`
              display: none;
            `}
          `}
          type="button"
          aria-label="Lasīt ierakstu"
        />
      </div>
    </div>
  );
};

export default memo(Post);

type Props = PostModel & {
  rows?: number;
  isFocused: boolean;
  toggleFocus: (url: string) => void;
};
