import A from '../components/typography/a';
import H1 from '../components/typography/h1';
import P from '../components/typography/p';
import React from 'react';
import styled from "styled-components";

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  margin: 0 auto;
`;

const Greeting = styled(H1)`
  margin-bottom: 32px;
`;

const AboutMe = styled(P)`
  max-width: 500px;
`;

const Me = styled.img`
  border: 1px solid ${({ theme }) => theme.colors.greys.light};
  border-radius: 50%;
  margin-bottom: 32px;
  max-width: 250px;
`;

export default function Index() {
  return (
    <Container>
      <Greeting>Hello!</Greeting>
      <Me src="/static/images/me.png" />
      <AboutMe>
        I&apos;m Kyle Thompson. This is a place for my thoughts on mostly programming-related topics. I'm a Software
        Engineer at <A href="https://root.engineering/" target="_blank" rel="noopener norefferer">Root Insurance</A>.
        Everything I write here is my own opinion.
      </AboutMe>
    </Container>
  );
}
