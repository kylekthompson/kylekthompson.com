import Footer from '../footer';
import Header from '../header';
import React from 'react';
import reset from 'styled-reset';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import typography from './typography';
import { graphql, useStaticQuery } from 'gatsby';
import { Helmet } from 'react-helmet';

const theme = {
  colors: {
    primary: '#054A91',
    secondary: '#3E7CB1',
    background: '#EEEEEE',
    accent: '#FF5E5B',
    accentTransparent: '#FF5E5B36',
    black: '#333333',
    greys: {
      light: '#C8C8C8',
    },
  },
};

const GlobalStyle = createGlobalStyle`
  ${reset}

  body {
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.black};
    font-family: 'Open Sans', sans-serif;
    margin: 0;
  }

  ::selection {
    background-color: ${({ theme }) => theme.colors.accent};
    color: white;
  }

  * {
    box-sizing: border-box;
  }

  ${typography}
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
    <ThemeProvider theme={theme}>
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
        >
          <link
            href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,700"
            rel="stylesheet"
          />
        </Helmet>
        <ContentContainer>
          <Header />
          <main>{children}</main>
        </ContentContainer>
        <FooterContainer>
          <Footer />
        </FooterContainer>
      </Container>
    </ThemeProvider>
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
