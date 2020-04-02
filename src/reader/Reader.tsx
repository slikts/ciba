/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useState, useEffect, memo } from 'react';
import { produce } from 'immer';
import { useTheme } from 'emotion-theming';

import Post from './Post';
import db, { Post as PostModel } from '../db';

const Reader = () => {
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

export default memo(Reader);
