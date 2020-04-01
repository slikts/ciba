/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useState, useEffect } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import locale from 'date-fns/locale/lv';
import db, { Post as PostModel } from '../db';
import { sanitizeContent } from './util';

const Reader = () => {
  const [posts, setPosts] = useState<PostModel[]>([]);

  useEffect(() => {
    db.posts
      .limit(20)
      .reverse()
      .sortBy('date')
      .then((data) => {
        return setPosts(data);
      });
  }, [setPosts]);
  return (
    <div
      css={css`
        max-width: 700px;
      `}
    >
      {posts.map(Post)}
    </div>
  );
};

export default Reader;

const Post = ({ url, title, user, content, date }: PostModel) => {
  return (
    <div key={url}>
      {title && <h2>{title}</h2>}
      <div>
        <a href={`http://klab.lv/users/${user}`}>{user}</a>
      </div>
      <div>
        <a href={url}>{formatDistanceToNow(date, { locale, addSuffix: true })}</a>
      </div>
      <div {...sanitizeContent(content)} />
    </div>
  );
};
