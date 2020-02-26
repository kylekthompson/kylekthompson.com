const { createPostPages } = require('./gatsby/create-pages/posts');
const { onCreateMdxNode } = require('./gatsby/on-create-node/mdx');

async function createPages(args) {
  await createPostPages(args);
}

function onCreateNode({ node, ...rest }) {
  if (node.internal.type === 'Mdx') {
    onCreateMdxNode({ node, ...rest });
  }
}

exports.createPages = createPages;
exports.onCreateNode = onCreateNode;
