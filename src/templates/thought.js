import MDXRenderer from 'gatsby-mdx/mdx-renderer';
import Markdown from 'react-markdown';
import React from 'react';
import { graphql } from 'gatsby';

export default function Thought({ data: { mdx } }) {
  const { title, date, description } = mdx.fields;

  return (
    <article>
      <h1>{title}</h1>
      <div>
        <h3>{date}</h3>
      </div>
      {description ? <Markdown>{description}</Markdown> : null}
      <MDXRenderer>{mdx.code.body}</MDXRenderer>
    </article>
  );
}

export const pageQuery = graphql`
  query($id: String!) {
    mdx(fields: { id: { eq: $id } }) {
      fields {
        title
        description
        date(formatString: "MMMM DD, YYYY")
      }
      code {
        body
      }
    }
  }
`;
