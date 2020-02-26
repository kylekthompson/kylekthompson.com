import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  max-width: 720px;
  padding: 20px 0;
  width: calc(100vw - 40px);
`;

const NavigationContainer = styled.div`
  margin-left: auto;
`;

export default function Header() {
  return (
    <Container>
      <Link to="/">kylekthompson.com</Link>
      <NavigationContainer>
        <Link to="/blog">Blog</Link>
      </NavigationContainer>
    </Container>
  );
}
