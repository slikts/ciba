/** @jsx jsx */
import { memo, useEffect } from 'react';

import { jsx } from '@emotion/core';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import differenceInHours from 'date-fns/differenceInHours';
import locale from 'date-fns/locale/lv';

import { useRerender } from '../util';

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

export default memo(Distance);
