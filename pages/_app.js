import App, { Container } from "next/app";
import Head from 'next/head';
import Header, { height as headerHeight } from '../components/header';
import Footer, { height as footerHeight } from '../components/footer';
import React from "react";
import reset from "styled-reset";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";

const theme = {
  colors: {
    primary: "#054A91",
    secondary: "#3E7CB1",
    background: "#EEEEEE",
    accent: "#FF5E5B",
    accentTransparent: "#FF5E5B36",
    black: "#333333",
    greys: {
      light: "#C8C8C8",
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
`;

const PageContainer = styled.div`
  display: flex;
  flex: 1;
  margin: 20px;
  min-height: calc(100vh - ${headerHeight}px - ${footerHeight}px - 40px);
`;

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <ThemeProvider theme={theme}>
          <>
            <Head>
              <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png" />
              <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png" />
              <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png" />
              <link rel="manifest" href="/static/site.webmanifest" />
              <link rel="mask-icon" href="/static/safari-pinned-tab.svg" color="#5bbad5" />
              <link rel="shortcut icon" href="/static/favicon.ico" />
              <meta name="theme-color" content={theme.colors.background} />
              <meta name="description" content="Kyle Thompson's personal blog" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <meta name="application-name" content="yieldthoughts" />
              <meta name="referrer" content="same-origin" />
              <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,700" rel="stylesheet" />
              <title>yield([&#128173;, &#128173;, &#128173;])</title>
            </Head>
            <GlobalStyle />
            <Header />
            <PageContainer>
              <Component {...pageProps} />
            </PageContainer>
            <Footer />
          </>
        </ThemeProvider>
      </Container>
    );
  }
}
