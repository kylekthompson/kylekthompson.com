import A from '../typography/a';
import H1 from '../typography/h1';
import P from '../typography/p';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  max-width: 1040px;
  padding: 20px;
`;

const FooterP = styled(P)`
  line-height: 1;
  font-size: 16px;
`;

const FooterA = styled(A)`
  line-height: 1;
  font-size: 16px;
`;

const CopyrightP = styled(FooterP)`
  margin-left: auto;
`;

function Source() {
  return (
    <FooterA
      href="https://github.com/kylekthompson/yieldthoughts.com"
      target="_blank"
      rel="noopener norefferer"
    >
      source
    </FooterA>
  );
}

export const height = 56;

export default function Footer({ date = new Date() }) {
  return (
    <Container>
      <FooterP>
        View the <Source />.
      </FooterP>
      <CopyrightP>Copyright &copy; {date.getFullYear()}</CopyrightP>
    </Container>
  );
}
