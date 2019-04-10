import A from '../components/typography/a';
import H1 from '../components/typography/h1';
import H2 from '../components/typography/h2';
import Image from '../components/image';
import P from '../components/typography/p';
import React from 'react';
import styled from 'styled-components';
import { RecentThoughts } from '../components/thoughts';

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  margin: 0 auto;
`;

const Greeting = styled(H1)`
  margin-bottom: 30px;
`;

const AboutMe = styled(P)`
  max-width: 500px;
`;

const MeContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.greys.light};
  border-radius: 50%;
  height: 250px;
  width: 250px;
  margin-bottom: 30px;
`;

const Me = styled(Image)`
  width: 100%;
`;

const RecentThoughtsHeader = styled(H2)`
  margin: 30px 0;
`;

export default function Index() {
  return (
    <Container>
      <Greeting>Hello!</Greeting>
      <MeContainer>
        <Me alt="Image of Kyle Thompson" src="/static/images/me" />
      </MeContainer>
      <AboutMe>
        I&rsquo;m Kyle Thompson, a Software Engineer at{' '}
        <A
          href="https://root.engineering/"
          target="_blank"
          rel="noopener norefferer"
        >
          Root Insurance
        </A>
        . This is a place for my thoughts on mostly programming-related topics.
        Everything I write here is my own opinion.
      </AboutMe>
      <RecentThoughtsHeader>Recent Thoughts</RecentThoughtsHeader>
      <RecentThoughts />
    </Container>
  );
}
