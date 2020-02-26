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
  flex-direction: column;
  margin: 0 auto;
  max-width: 720px;
  width: calc(100vw - 40px);
`;

const Greeting = styled.h1`
  margin-bottom: 30px;
`;

const AboutMe = styled.p`
  margin-bottom: 30px;
  max-width: 500px;
`;

const StyledImage = styled(Image)`
  margin-bottom: 30px;
`;

const RecentPostsHeader = styled.h2`
  font-size: 1.65rem;
  margin: 30px 0;
`;

export default function Index() {
  const { me, recent } = useStaticQuery(INDEX_QUERY);

  return (
    <Layout>
      <SEO />
      <Container>
        <Greeting>Hello!</Greeting>
        <StyledImage
          alt="Image of Kyle Thompson"
          fixed={me.childImageSharp.fixed}
        />
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
        <RecentPostsHeader>Recent Posts</RecentPostsHeader>
        {recent.edges.map(({ node }) => (
          <RecentPost key={node.fields.slug} post={node} />
        ))}
      </Container>
    </Layout>
  );
}

const INDEX_QUERY = graphql`
  query {
    me: file(relativePath: { eq: "assets/images/me.png" }) {
      childImageSharp {
        fixed(
          width: 250
          height: 250
          traceSVG: { color: "#3E7CB1" }
          quality: 75
        ) {
          ...GatsbyImageSharpFixed_withWebp_tracedSVG
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
