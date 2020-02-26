import Image from 'gatsby-image';
import Layout from '../../components/layout';
import React from 'react';
import SEO from '../../components/seo';
import styled from 'styled-components';
import { Link, graphql, useStaticQuery } from 'gatsby';

const PaddingWrapper = styled.div`
  margin: 0 auto;
  max-width: 720px;
  width: calc(100vw - 40px);
`;

const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.greys.lighter};
  margin-bottom: 30px;
  padding: 20px;
  border-radius: 5px;
`;

const Title = styled.h2`
  margin-bottom: 10px;
`;

const StyledImage = styled(Image)`
  border-radius: 5px;
  margin-bottom: 20px;
`;

const NoDecorationLink = styled(Link)`
  color: ${({ theme }) => theme.colors.black};

  &:hover {
    text-decoration: none;
  }
`;

const NavigationWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 30px;
  width: 100%;
`;

const LeftNav = styled(Link)``;

const RightNav = styled(Link)`
  margin-left: auto;
`;

function Navigation({ previous, next }) {
  if (!previous || !next) {
    return null;
  }

  return (
    <NavigationWrapper>
      {previous && <LeftNav to={previous}>&larr; Older</LeftNav>}
      {next && <RightNav to={next}>Newer &rarr;</RightNav>}
    </NavigationWrapper>
  );
}

export default function Blog({ pageContext: { pagination } }) {
  const { allPosts } = useStaticQuery(ALL_POSTS_QUERY);
  const { path, page, pageNumber, nextPagePath, previousPagePath } = pagination;
  const posts = page.map((id) =>
    allPosts.edges.find((edge) => edge.node.id === id)
  );

  return (
    <Layout>
      <SEO title={`All Blog Posts | Page ${pageNumber}`} slug={path} />
      <PaddingWrapper>
        {posts.map(({ node }) => (
          <NoDecorationLink
            key={node.fields.slug}
            aria-label={`view the "${node.fields.title}" article`}
            to={node.fields.slug}
          >
            <Card>
              <StyledImage
                fluid={node.fields.bannerImage.childImageSharp.fluid}
              />
              <Title>{node.fields.title}</Title>
              <p>{node.excerpt}</p>
            </Card>
          </NoDecorationLink>
        ))}
        <Navigation previous={previousPagePath} next={nextPagePath} />
      </PaddingWrapper>
    </Layout>
  );
}

const ALL_POSTS_QUERY = graphql`
  query {
    allPosts: allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: { published: { ne: false } }
        fileAbsolutePath: { regex: "//content/posts//" }
      }
    ) {
      edges {
        node {
          excerpt(pruneLength: 300)
          id
          fields {
            title
            slug
            bannerImage {
              childImageSharp {
                fluid(
                  maxWidth: 640
                  traceSVG: { color: "#3E7CB1" }
                  quality: 75
                ) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
          }
        }
      }
    }
  }
`;
