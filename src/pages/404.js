import Layout from '../components/layout';
import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  align-items: center;
  background-color: ${(props) => props.theme.colors.offWhite};
  box-shadow: 0px 4px 75px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: -125px auto 0;
  max-width: 800px;
  min-height: 250px;
  padding: 40px 0;
  width: calc(100vw - 40px);
`;

const Header = styled.h1`
  margin-bottom: 5px;
`;

export default function NotFound() {
  return (
    <Layout>
      <Card>
        <Header>404</Header>
        <p>Uh oh. Can't seem to find that.</p>
      </Card>
    </Layout>
  );
}
