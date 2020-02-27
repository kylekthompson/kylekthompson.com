import Image from 'gatsby-image';
import Layout from '../components/layout';
import React from 'react';
import RecentPost from '../components/recent-post';
import SEO from '../components/seo';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';

const Container = styled.div`
  align-items: center;
  display: flex;
  filter: drop-shadow(0px 4px 75px rgba(0, 0, 0, 0.25));
  flex-direction: column;
  margin: -250px auto 0;
  max-width: 800px;
  width: calc(100vw - 40px);
`;

const Card = styled.div`
  align-items: center;
  background-color: ${(props) => props.theme.colors.offWhite};
  display: flex;
  flex-direction: column;
  margin: -125px auto 0;
  padding: calc(125px + 30px) 0 10px;
  width: 100%;
`;

const AboutMe = styled.p`
  max-width: 500px;
  width: calc(100vw - 80px);
`;

const LatestPostsHeader = styled.h2`
  margin: 60px 0 30px;
`;

export default function Index() {
  const { me, recent } = useStaticQuery(INDEX_QUERY);

  return (
    <Layout>
      <SEO />
      <Container>
        <Image
          alt="Image of Kyle Thompson"
          fixed={me.childImageSharp.fixed}
        />
        <Card>
          <AboutMe>
            I'm Kyle Thompson, a Software Engineer at{' '}
            <a
              href="https://root.engineering/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Root Insurance
            </a>
            . This is a place for my thoughts on mostly programming-related
            topics. Everything I write here is my own opinion.
          </AboutMe>
          <LatestPostsHeader>Latest Posts</LatestPostsHeader>
          {recent.edges.map(({ node }) => (
            <RecentPost key={node.fields.slug} post={node} />
          ))}
        </Card>
      </Container>
    </Layout>
  );
}

const INDEX_QUERY = graphql`
  query {
    me: file(relativePath: { eq: "assets/images/me.png" }) {
      childImageSharp {
        fixed(
          width: 250,
          height: 250,
          quality: 75
        ) {
          ...GatsbyImageSharpFixed_withWebp_noBase64
        }
      }
    }
    recent: allMdx(
      limit: 2
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: { published: { ne: false } }
        fileAbsolutePath: { regex: "//content/posts//" }
      }
    ) {
      edges {
        node {
          excerpt(pruneLength: 190)
          id
          fields {
            title
            slug
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`;
