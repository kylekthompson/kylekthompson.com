const path = require('path');

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

function createThoughts({ createPage, thoughts }) {
  thoughts.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve('./src/templates/thought.js'),
      context: {
        id: node.id,
      },
    });
  });
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
  createThoughts({ createPage: actions.createPage, thoughts });
}

module.exports = {
  createThoughtPages,
};
