import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  padding: 20px 0;
`;

function Source() {
  return (
    <a
      href="https://github.com/kylekthompson/yieldthoughts.com"
      target="_blank"
      rel="noopener noreferrer"
    >
      source
    </a>
  );
}

const Copyright = styled.p`
  margin-left: auto;
`;

export default function Footer({ date = new Date() }) {
  return (
    <Container>
      <p>
        View the <Source />.
      </p>
      <Copyright>Copyright &copy; {date.getFullYear()}</Copyright>
    </Container>
  );
}
