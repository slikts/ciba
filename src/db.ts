import Dexie from 'dexie';
import 'dexie-observable';

export class Db extends Dexie {
  constructor() {
    super('ciba');

    this.version(1).stores({
      posts: `url, user, date`,
    });

    this.open();
  }

  onCreated(handler: Function) {
    this.on('changes', (changes: any[]) => {
      changes.forEach(({ type, obj }) => {
        if (type === 1) {
          handler(obj);
        }
      });
    });
  }

  storeFeed({ items }: Feed) {
    this.posts.bulkPut(items.map(Post));
  }
}

export interface Db {
  posts: Dexie.Table<Post, string>;
}

const db = new Db();

export default db;

export type Post = {
  url: string;
  user: string;
  date: Date;
  content: string;
  title?: string;
};

export type Feed = any;

export type Item = any;

export const Title = (title: string, user: string) => {
  if (title === user) {
    return undefined;
  }
  return title.slice(user.length + 1).trim();
};

export const User = (creator: string) => {
  return creator.match(/\((.+)\)/)![1];
};

export const Post = ({ link: url, date, content, title, creator }: Item): Post => {
  const user = User(creator);
  return {
    url,
    user,
    date: new Date(date),
    content,
    title: Title(title, user),
  };
};
