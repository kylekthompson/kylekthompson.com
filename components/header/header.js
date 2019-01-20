import ActiveLink from './active-link';
import React from 'react';
import Link from 'next/link'
import styled from 'styled-components';

const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const InnerContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  margin: 20px;
`;

const LogoAnchor = styled.a`
  display: flex;
  align-items: center;
`;

const Separator = styled.span`
  border-bottom: solid 1px ${({ theme }) => theme.colors.greys.light};
  margin: 0 20px;
`;

const Logo = styled.img`
  cursor: pointer;
  height: 20px;
  vertical-align: bottom;
  width: auto;
`;

const Me = styled.img`
  border: solid 1px ${({ theme }) => theme.colors.greys.light};
  border-radius: 20px;
  cursor: pointer;
  height: auto;
  margin-right: 10px;
  vertical-align: bottom;
  width: 40px;
`;

const NavigationContainer = styled.div`
  margin-left: auto;
`;

export default function Header() {
  return (
    <OuterContainer>
      <InnerContainer>
        <Link href="/">
          <LogoAnchor>
            <Me
              alt="Kyle Thompson"
              src="/static/images/header/me.png"
            />
            <Logo
              alt="yieldthoughts.com logo"
              src="/static/images/header/logo.svg"
            />
          </LogoAnchor>
        </Link>
        <NavigationContainer>
          <ActiveLink href="/history">History</ActiveLink>
        </NavigationContainer>
      </InnerContainer>
      <Separator />
    </OuterContainer>
  );
}
