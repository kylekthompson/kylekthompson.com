import Layout from '../components/layout';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 720px;
  padding-top: 30vh;
  text-align: center;
  width: calc(100vw - 40px);
`;

const Header = styled.h1`
  margin-bottom: 5px;
`;

export default function NotFound() {
  return (
    <Layout>
      <Container>
        <Header>Bummer.</Header>
        <p>There doesn't seem to be anything here.</p>
      </Container>
    </Layout>
  );
}
