const remark = require('remark');
const stripMarkdownPlugin = require('strip-markdown');
const { createFilePath } = require('gatsby-source-filesystem');

function stripMarkdown(markdownString) {
  return remark()
    .use(stripMarkdownPlugin)
    .processSync(markdownString)
    .toString();
}

function buildSlug({ getNode, node }) {
  if (node.fileAbsolutePath.includes('content/thoughts/')) {
    const parent = getNode(node.parent);
    const thoughtPath = createFilePath({
      node: parent,
      getNode,
      basePath: 'content/thoughts/',
    });
    return `/thoughts${thoughtPath}`;
  }

  return createFilePath({ node, getNode });
}

function onCreateMdxNode({ actions, getNode, node }) {
  const { createNodeField } = actions;

  createNodeField({
    name: 'id',
    node,
    value: node.id,
  });

  createNodeField({
    name: 'title',
    node,
    value: node.frontmatter.title,
  });

  createNodeField({
    name: 'description',
    node,
    value: node.frontmatter.description,
  });

  createNodeField({
    name: 'date',
    node,
    value: node.frontmatter.date,
  });

  createNodeField({
    name: 'author',
    node,
    value: node.frontmatter.author,
  });

  createNodeField({
    name: 'categories',
    node,
    value: node.frontmatter.categories || [],
  });

  createNodeField({
    name: 'keywords',
    node,
    value: node.frontmatter.keywords || [],
  });

  createNodeField({
    name: 'published',
    node,
    value: node.frontmatter.published,
  });

  createNodeField({
    name: 'plainTextDescription',
    node,
    value: stripMarkdown(node.frontmatter.description),
  });

  createNodeField({
    name: 'slug',
    node,
    value: buildSlug({ getNode, node }),
  });
}

module.exports = {
  onCreateMdxNode,
};
