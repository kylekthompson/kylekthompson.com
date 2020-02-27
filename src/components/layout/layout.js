import Footer from '../footer';
import Header from '../header';
import React from 'react';
import mdxComponents from '../mdx';
import reset from 'styled-reset';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import typography from './typography';
import { Helmet } from 'react-helmet';
import { MDXProvider } from '@mdx-js/react';
import { graphql, useStaticQuery } from 'gatsby';

const theme = {
  colors: {
    mediumElectricBlue: '#054A91',
    steelBlue: '#3E7CB1',
    isabelline: '#EEEEEE',
    sunsetOrange: '#FF5E5B',
    sunsetOrangeTransparent: '#FF5E5B36',
    offBlack: '#333333',
    offWhite: '#FDFDFD',
    greys: {
      lighter: '#F3F3F3',
      darker: '#C8C8C8',
    },
  },
};

const GlobalStyle = createGlobalStyle`
  ${reset}

  html {
    background-color: ${(props) => props.theme.colors.isabelline};
  }

  body {
    color: ${(props) => props.theme.colors.offBlack};
    font-family: 'Open Sans', sans-serif;
    margin: 0;
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
  min-height: 100vh;
`;

const ContentContainer = styled.div`
  align-items: center;
  justifty-content: center;
  flex: 1 0 auto;
`;

const FooterContainer = styled.div`
  flex-shrink: 0;
`;

export default function Layout({ children }) {
  const {
    site: { siteMetadata },
  } = useStaticQuery(METADATA_QUERY);

  return (
    <ThemeProvider theme={theme}>
      <>
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
        <Container>
          <ContentContainer>
            <Header />
            <MDXProvider components={mdxComponents}>
              <main>{children}</main>
            </MDXProvider>
          </ContentContainer>
          <FooterContainer>
            <Footer />
          </FooterContainer>
        </Container>
      </>
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
