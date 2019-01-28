const thoughts = require('./components/thoughts/thoughts');

const thoughtPages = thoughts.reduce((pages, thought) => ({
  ...pages,
  [thought.href]: {
    page: thought.href,
  },
}), {});

module.exports = {
  exportPathMap: () => ({
    ...thoughtPages,
    '/': {
      page: '/',
    },
  }),
};
