import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { withRouter } from 'next/router';

const Anchor = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  font-size: 16px;
  ${({ active }) => (active ? 'font-weight: bold;' : '')}
  &:hover {
    text-decoration: underline;
  }
`;

function ActiveLink({ children, router, ...rest }) {
  return (
    <Link {...rest}>
      <Anchor active={rest.href === router.pathname}>{children}</Anchor>
    </Link>
  );
}

export default withRouter(ActiveLink);
