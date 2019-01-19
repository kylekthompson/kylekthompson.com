import React from 'react';
import styled from 'styled-components';

const Logo = styled.img`
  width: 400px;
`;

export default function Index() {
  return (
    <div>
      <Logo alt="yieldthoughts.com logo" src="/static/images/logo.svg" />
    </div>
  );
}
