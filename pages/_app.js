import App, { Container } from "next/app";
import Head from 'next/head';
import React from "react";
import reset from "styled-reset";
import { createGlobalStyle, ThemeProvider } from "styled-components";

const theme = {
  colors: {
    primary: "#054A91",
    secondary: "#3E7CB1",
    background: "#EEEEEE",
    accent: "#FF5E5B",
    black: "#071013",
  },
};

const GlobalStyle = createGlobalStyle`
  ${reset}

  body {
    background-color: ${props => props.theme.colors.background};
    margin: 0;
  }
`;

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <ThemeProvider theme={theme}>
          <>
            <GlobalStyle />
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
              <title>yield([&#128173;, &#128173;, &#128173;])</title>
            </Head>
            <Component {...pageProps} />
          </>
        </ThemeProvider>
      </Container>
    );
  }
}
