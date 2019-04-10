import Image from 'gatsby-image';
import Layout from '../../components/layout';
import MDXRenderer from 'gatsby-mdx/mdx-renderer';
import Markdown from 'react-markdown';
import React from 'react';
import BannerCreditLink from './banner-credit-link';
import SEO from '../../components/seo';
import { graphql } from 'gatsby';

export default function Thought({ data: { mdx } }) {
  const {
    bannerCredit,
    bannerImage,
    bannerAlt,
    date,
    description,
    plainTextDescription,
    slug,
    title,
  } = mdx.fields;

  return (
    <Layout>
      <SEO
        title={title}
        description={plainTextDescription}
        image={bannerImage.childImageSharp.fluid.src}
        isArticle={true}
        slug={slug}
      />
      <article>
        <h1>{title}</h1>
        <div>
          <h3>{date}</h3>
        </div>
        <Image alt={bannerAlt} fluid={bannerImage.childImageSharp.fluid} />
        <Markdown renderers={{ link: BannerCreditLink }}>
          {bannerCredit}
        </Markdown>
        {description ? <Markdown>{description}</Markdown> : null}
        <MDXRenderer>{mdx.code.body}</MDXRenderer>
      </article>
    </Layout>
  );
}

export const pageQuery = graphql`
  query($id: String!) {
    mdx(fields: { id: { eq: $id } }) {
      fields {
        title
        description
        plainTextDescription
        date(formatString: "MMMM DD, YYYY")
        slug
        bannerAlt
        bannerCredit
        bannerImage {
          childImageSharp {
            fluid(maxWidth: 720, traceSVG: { color: "#EEEEEE" }, quality: 75) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
      code {
        body
      }
    }
  }
`;
