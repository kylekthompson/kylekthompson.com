import Image from 'gatsby-image';
import Layout from '../../components/layout';
import React from 'react';
import SEO from '../../components/seo';
import styled from 'styled-components';
import { Link, graphql, useStaticQuery } from 'gatsby';

const Container = styled.div`
  margin: -125px auto 0;
  max-width: 800px;
  width: calc(100vw - 40px);
`;

const Card = styled.div`
  background-color: ${(props) => props.theme.colors.offWhite};
  box-shadow: 0px 4px 75px rgba(0, 0, 0, 0.25);
  margin-bottom: 30px;
  padding: 20px;
`;

const Title = styled.h2`
  margin-bottom: 10px;
`;

const ImageContainer = styled.div`
  width: 100%;
`;

const StyledImage = styled(Image)`
  margin-bottom: 20px;
`;

const NoDecorationLink = styled(Link)`
  color: ${({ theme }) => theme.colors.offBlack};

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
      <Container>
        {posts.map(({ node }) => (
          <NoDecorationLink
            key={node.fields.slug}
            aria-label={`view the "${node.fields.title}" article`}
            to={node.fields.slug}
          >
            <Card>
              <ImageContainer>
                <StyledImage
                  fluid={node.fields.bannerImage.childImageSharp.fluid}
                />
              </ImageContainer>
              <Title>{node.fields.title}</Title>
              <p>{node.excerpt}</p>
            </Card>
          </NoDecorationLink>
        ))}
        <Navigation previous={previousPagePath} next={nextPagePath} />
      </Container>
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
