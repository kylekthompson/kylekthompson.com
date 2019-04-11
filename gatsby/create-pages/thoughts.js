const path = require('path');

const THOUGHTS_PER_PAGE = 5;
const THOUGHTS_QUERY = `
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
    thoughts: allMdx(
      filter: {
        frontmatter: {published: {ne: false}}
        fileAbsolutePath: {regex: "//content/thoughts//"}
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

function createPosts({ createPage, thoughts }) {
  thoughts.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve('./src/templates/thought/index.js'),
      context: {
        id: node.id,
      },
    });
  });
}

function createHistory({ createPage, thoughts }) {
  const pages = thoughts.edges.reduce((paginated, thought, index) => {
    const page = Math.floor(index / THOUGHTS_PER_PAGE);

    if (!paginated[page]) {
      paginated[page] = [];
    }

    paginated[page].push(thought.node.id);

    return paginated;
  }, [])

  pages.forEach((page, index) => {
    const previousPagePath = `/thoughts/${index + 1}`;
    const nextPagePath = index === 1 ? '/thoughts' : `/thoughts/${index - 1}`
    const pagePath = index > 0 ? `/thoughts/${index}` : '/thoughts';

    createPage({
      path: pagePath,
      component: path.resolve('./src/templates/thoughts/index.js'),
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
    })
  })
}

async function getThoughts(graphql) {
  const { data, errors } = await graphql(THOUGHTS_QUERY);

  if (errors) {
    throw errors;
  }

  if (!data.thoughts.edges && data.thoughts.edges.length <= 0) {
    throw new Error('No thoughts found');
  }

  return data.thoughts;
}

async function createThoughtPages({ actions, graphql }) {
  const thoughts = await getThoughts(graphql);
  createPosts({ createPage: actions.createPage, thoughts });
  createHistory({ createPage: actions.createPage, thoughts });
}

module.exports = {
  createThoughtPages,
};
