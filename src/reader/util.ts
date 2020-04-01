import sanitizeHtml from 'sanitize-html';

export const sanitizeContent = (dirty: string) => {
  const content = dirty
    .replace(/<lj-cut.+?>(.+)<\/lj-cut>/g, (a, b) => {
      console.log(a, b);

      return `${b}`;
    })
    .replace(/\n/g, '<br />');

  return htmlProps(
    sanitizeHtml(content, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
    }),
  );
};

const htmlProps = (__html: string) => {
  return {
    dangerouslySetInnerHTML: { __html },
  };
};
