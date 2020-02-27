import Layout from '../components/layout';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  align-items: center;
  display: flex;
  filter: drop-shadow(0px 4px 75px rgba(0, 0, 0, 0.25));
  flex-direction: column;
  margin: 0 auto;
  max-width: 800px;
  width: calc(100vw - 40px);
`;

const Card = styled.div`
  align-items: center;
  background-color: ${(props) => props.theme.colors.offWhite};
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: -125px auto 0;
  min-height: 250px;
  padding: 40px 0;
  width: 100%;
`;

const Header = styled.h1`
  margin-bottom: 5px;
`;

export default function NotFound() {
  return (
    <Layout>
      <Container>
        <Card>
          <Header>404</Header>
          <p>Uh oh. Can't seem to find that.</p>
        </Card>
      </Container>
    </Layout>
  );
}
