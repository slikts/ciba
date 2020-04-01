import axios from 'axios';
import Parser from 'rss-parser';
import db, { Feed } from '../db';

const parser = new Parser();

const feedUrl = 'http://klab.lv/stats/latest-rss.bml';

const poll = async () => {
  console.log('polling');
  const feed: Feed = await parser.parseString((await axios.get(feedUrl)).data);

  db.storeFeed(feed);
};

export default poll;
