const path = require('path');

const POSTS_PER_PAGE = 5;
const POSTS_QUERY = `
  fragment PostDetails on Mdx {
    fileAbsolutePath
    id
    parent {
      ... on File {
        name
        sourceInstanceName
      }
    }
    excerpt(pruneLength: 250)
    fields {
      title
      slug
      description
      date
    }
  }

  query {
    posts: allMdx(
      filter: {
        frontmatter: {published: {ne: false}}
        fileAbsolutePath: {regex: "//content/posts//"}
      }
      sort: {order: DESC, fields: [frontmatter___date]}
    ) {
      edges {
        node {
          ...PostDetails
        }
      }
    }
  }
`;

function createPosts({ createPage, posts }) {
  posts.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve('./src/templates/post/index.js'),
      context: {
        id: node.id,
      },
    });
  });
}

function createHistory({ createPage, posts }) {
  const pages = posts.edges.reduce((paginated, post, index) => {
    const page = Math.floor(index / POSTS_PER_PAGE);

    if (!paginated[page]) {
      paginated[page] = [];
    }

    paginated[page].push(post.node.id);

    return paginated;
  }, []);

  pages.forEach((page, index) => {
    const previousPagePath = `/blog/${index + 1}`;
    const nextPagePath = index === 1 ? '/blog' : `/blog/${index - 1}`;
    const pagePath = index > 0 ? `/blog/${index}` : '/blog';

    createPage({
      path: pagePath,
      component: path.resolve('./src/templates/blog/index.js'),
      context: {
        pagination: {
          page,
          nextPagePath: index === 0 ? null : nextPagePath,
          previousPagePath:
            index === pages.length - 1 ? null : previousPagePath,
          pageNumber: index + 1,
          path: pagePath,
        },
      },
    });
  });
}

async function getPosts(graphql) {
  const { data, errors } = await graphql(POSTS_QUERY);

  if (errors) {
    throw errors;
  }

  if (!data.posts.edges && data.posts.edges.length <= 0) {
    throw new Error('No posts found');
  }

  return data.posts;
}

async function createPostPages({ actions, graphql }) {
  const posts = await getPosts(graphql);
  createPosts({ createPage: actions.createPage, posts });
  createHistory({ createPage: actions.createPage, posts });
}

module.exports = {
  createPostPages,
};
