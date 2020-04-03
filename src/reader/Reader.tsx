/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useState, useEffect, memo, useCallback, useRef } from 'react';
import { produce } from 'immer';
import { useTheme } from 'emotion-theming';

import Post from './Post';
import db, { Post as PostModel } from '../db';

const Reader = ({ wrapperRef }: Props) => {
  const [posts, setPosts] = useState<PostModel[]>([]);
  const theme = useTheme<any>();

  useEffect(() => {
    db.posts.orderBy('date').limit(20).reverse().toArray().then(setPosts);

    db.onCreated((item) => {
      setPosts((oldPosts) => {
        return produce(oldPosts, (draft) => {
          draft.unshift(item);
        });
      });
    });
  }, [setPosts]);

  const [focusedUrl, setFocused] = useState<string | null>(null);
  const toggleFocus = useCallback(
    (url) => {
      setFocused((state) => {
        if (url === state) {
          return null;
        }
        return url;
      });
    },
    [setFocused],
  );
  useEffect(() => {
    const { current: wrapper } = wrapperRef;

    const unfocus = ({ target }: any) => {
      if (target !== wrapper) {
        return;
      }

      setFocused(null);
    };
    wrapper.addEventListener('click', unfocus);

    return () => {
      wrapper.removeEventListener('click', unfocus);
    };
  }, [wrapperRef]);

  return (
    <div>
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
          const { url } = post;
          const isFocused = url === focusedUrl;
          return (
            <div
              css={css`
                width: var(--width);
                ${focusedUrl &&
                !isFocused &&
                css`
                  opacity: 0.5;
                `}
              `}
              key={post.url}
            >
              <Post {...post} toggleFocus={toggleFocus} isFocused={isFocused} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default memo(Reader);

type Props = any;
