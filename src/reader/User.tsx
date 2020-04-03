/** @jsx jsx */
import { memo } from 'react';
import { jsx, css } from '@emotion/core';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from 'emotion-theming';

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
      target="_blank"
      rel="noreferrer noopener"
    >
      <span
        css={css`
          font-size: 0.8em;
          position: relative;
          // top: -0.15em;
        `}
      >
        {/* <FontAwesomeIcon icon={faUser} /> */}
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

export default memo(User);
