import Image from 'gatsby-image';
import Layout from '../../components/layout';
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer';
import Markdown from 'react-markdown';
import React from 'react';
import BannerCreditLink from './banner-credit-link';
import SEO from '../../components/seo';
import styled from 'styled-components';
import {
  BannerCreditWrapper,
  PostMeta,
  Title,
} from '../../components/blog-post';
import { graphql } from 'gatsby';

const PaddingWrapper = styled.div`
  margin: 0 auto;
  max-width: 720px;
  width: calc(100vw - 40px);
`;

export default function Thought({ data: { mdx } }) {
  const {
    author,
    bannerAlt,
    bannerCredit,
    bannerImage,
    date,
    description,
    slug,
    title,
  } = mdx.fields;

  return (
    <Layout>
      <SEO
        title={title}
        description={description}
        image={bannerImage.childImageSharp.fluid.src}
        isArticle={true}
        slug={slug}
      />
      <article>
        <PaddingWrapper>
          <Title>{title}</Title>
          <div>
            <PostMeta>
              {author} - {date}
            </PostMeta>
          </div>
        </PaddingWrapper>
        <Image alt={bannerAlt} fluid={bannerImage.childImageSharp.fluid} />
        <PaddingWrapper>
          <BannerCreditWrapper>
            <Markdown renderers={{ link: BannerCreditLink }}>
              {bannerCredit}
            </Markdown>
          </BannerCreditWrapper>
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </PaddingWrapper>
      </article>
    </Layout>
  );
}

export const pageQuery = graphql`
  query($id: String!) {
    mdx(fields: { id: { eq: $id } }) {
      fields {
        author
        bannerAlt
        bannerCredit
        bannerImage {
          childImageSharp {
            fluid(maxWidth: 720, traceSVG: { color: "#3E7CB1" }, quality: 75) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
        date(formatString: "MMMM DD, YYYY")
        description
        slug
        title
      }
      body
    }
  }
`;
