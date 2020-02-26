import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

const HeroColor = styled.div`
  background-color: ${(props) => props.theme.colors.steelBlue};
  height: 300px;
  padding: 20px 0;
`;

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  max-width: 800px;
  width: calc(100vw - 40px);

  a {
    color: ${(props) => props.theme.colors.offWhite};
  }
`;

const NavigationContainer = styled.div`
  margin-left: auto;
`;

export default function Header() {
  return (
    <HeroColor>
      <Container>
        <Link to="/">Kyle Thompson</Link>
        <NavigationContainer>
          <Link to="/blog">Blog</Link>
        </NavigationContainer>
      </Container>
    </HeroColor>
  );
}
