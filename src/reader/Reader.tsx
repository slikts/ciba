/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useState, useEffect } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import differenceInHours from 'date-fns/differenceInHours';
import locale from 'date-fns/locale/lv';
import { produce } from 'immer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from 'emotion-theming';
import linkify from 'linkifyjs/html';

import db, { Post as PostModel } from '../db';
import { sanitizeContent, useRerender } from '../util';

const Reader = () => {
  const [posts, setPosts] = useState<PostModel[]>([]);
  const theme = useTheme<any>();

  useEffect(() => {
    db.posts.orderBy('date').reverse().toArray().then(setPosts);

    db.onCreated((item) => {
      setPosts((oldPosts) => {
        return produce(oldPosts, (draft) => {
          draft.unshift(item);
        });
      });
    });
  }, [setPosts]);
  return (
    <div
      css={css`
        --width: 500px;
        max-width: var(--width);
        @media screen and (max-width: 500px) {
          max-width: calc(100% - ${theme.space[2] * 2}px);
        }
        img {
          max-width: 100%;
        }
      `}
    >
      {posts.map((post) => {
        return <Post key={post.url} {...post} />;
      })}
    </div>
  );
};

export default Reader;

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

const Distance = ({ date }: { date: Date }) => {
  const rerender = useRerender();
  const interval = differenceInHours(Date.now(), date) === 0 ? 60e3 : 60e3 * 60;

  useEffect(() => {
    const intervalId = window.setInterval(rerender, interval);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [rerender, interval]);

  return <span>{formatDistanceToNow(date, { locale, addSuffix: true })}</span>;
};

const User = ({ user }: { user: string }) => {
  const theme = useTheme<any>();

  return (
    <a
      href={`http://klab.lv/users/${user}`}
      css={css`
        text-decoration: none;
        &:not(:hover) {
          color: ${theme.colors.text};
          color: #fff;
        }
        &:hover .date {
          text-decoration: underline;
        }
      `}
    >
      <span
        css={css`
          font-size: 0.8em;
          position: relative;
          // top: -0.15em;
        `}
      >
        <FontAwesomeIcon icon={faUser} />
        &nbsp;
      </span>
      <span
        className="date"
        css={css`
          font-weight: bold;
        `}
      >
        {user}
      </span>
    </a>
  );
};
