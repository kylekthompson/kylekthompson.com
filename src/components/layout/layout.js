import Footer from '../footer';
import Header from '../header';
import React from 'react';
import reset from 'styled-reset';
import styled, { createGlobalStyle } from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';
import { Helmet } from 'react-helmet';

const GlobalStyle = createGlobalStyle`
  ${reset}

  body {
    margin: 0;
  }

  * {
    box-sizing: border-box;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  max-width: 720px;
  min-height: 100vh;
`;

const ContentContainer = styled.div`
  flex: 1 0 auto;
`;

const FooterContainer = styled.div`
  flex-shrink: 0;
`;

export default function Layout({ children }) {
  const { site: { siteMetadata } } = useStaticQuery(METADATA_QUERY);

  return (
    <Container>
      <GlobalStyle />
      <Helmet
        defaultTitle={siteMetadata.title}
        htmlAttributes={{ lang: 'en' }}
        titleTemplate={`${siteMetadata.title} | %s`}
        meta={[
          {
            name: 'description',
            content: siteMetadata.description,
          },
          {
            name: 'referrer',
            content: 'same-origin',
          },
        ]}
      />
      <ContentContainer>
        <Header />
        <main>{children}</main>
      </ContentContainer>
      <FooterContainer>
        <Footer />
      </FooterContainer>
    </Container>
  );
}

const METADATA_QUERY = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`;
