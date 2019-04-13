const { createThoughtPages } = require('./gatsby/create-pages/thoughts');
const { onCreateMdxNode } = require('./gatsby/on-create-node/mdx');

async function createPages(args) {
  await createThoughtPages(args);
}

function onCreateNode({ node, ...rest }) {
  if (node.internal.type === 'Mdx') {
    onCreateMdxNode({ node, ...rest });
  }
}

exports.createPages = createPages;
exports.onCreateNode = onCreateNode;
