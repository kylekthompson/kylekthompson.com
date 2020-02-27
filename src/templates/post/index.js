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

const Article = styled.article`
  align-items: center;
  background-color: ${(props) => props.theme.colors.offWhite};
  box-shadow: 0px 4px 75px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: -125px auto 0;
  max-width: 800px;
  min-height: 250px;
  padding: 40px 0;
  width: calc(100vw - 40px);
`;

const PaddingWrapper = styled.div`
  margin: 0 auto;
  max-width: 760px;
  width: calc(100vw - 80px);
`;

const ImageContainer = styled.div`
  width: 100%;
`;

export default function Post({ data: { mdx } }) {
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
      <Article>
        <PaddingWrapper>
          <Title>{title}</Title>
          <div>
            <PostMeta>
              {author} - {date}
            </PostMeta>
          </div>
        </PaddingWrapper>
        <ImageContainer>
          <Image alt={bannerAlt} fluid={bannerImage.childImageSharp.fluid} />
        </ImageContainer>
        <PaddingWrapper>
          <BannerCreditWrapper>
            <Markdown renderers={{ link: BannerCreditLink }}>
              {bannerCredit}
            </Markdown>
          </BannerCreditWrapper>
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </PaddingWrapper>
      </Article>
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
            fluid(maxWidth: 800, traceSVG: { color: "#3E7CB1" }, quality: 75) {
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
