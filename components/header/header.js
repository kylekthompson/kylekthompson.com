import ActiveLink from './active-link';
import React from 'react';
import Link from 'next/link'
import styled from 'styled-components';

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  max-width: 1000px;
  padding: 20px 0;
`;

const LogoAnchor = styled.a`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  cursor: pointer;
  height: 20px;
  vertical-align: bottom;
  width: auto;
`;

const NavigationContainer = styled.div`
  margin-left: auto;
`;

export const height = 60;

export default function Header() {
  return (
    <Container>
      <Link href="/">
        <LogoAnchor>
          <Logo
            alt="yieldthoughts.com logo"
            src="/static/images/header/logo.svg"
          />
        </LogoAnchor>
      </Link>
      <NavigationContainer>
        <ActiveLink href="/history">History</ActiveLink>
      </NavigationContainer>
    </Container>
  );
}
