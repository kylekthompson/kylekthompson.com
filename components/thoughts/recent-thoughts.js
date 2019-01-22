import A from '../typography/a';
import Link from 'next/link';
import P from '../typography/p';
import React from 'react';
import styled from 'styled-components';
import thoughts from './thoughts';
import { formatPostDate } from '../../models/date';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  width: 100%;
`;

const ThoughtContainer = styled.div`
  margin-bottom: 10px;
`;

const Title = styled(A)`
  color: ${({ theme }) => theme.colors.accent};
  font-size: 20px;
  font-weight: 600;
`;

const THOUGHT_LIMIT = 5;

function recentThoughts(allThoughts = thoughts) {
  return [...allThoughts].sort((a, b) => b.date - a.date).filter((_, index) => index < THOUGHT_LIMIT);
}

function Thought({ thought }) {
  return (
    <ThoughtContainer>
      <Link href={thought.href}>
        <Title>{thought.title}</Title>
      </Link>
      <P>{formatPostDate(thought.date)}</P>
    </ThoughtContainer>
  );
}

export default function RecentThoughts() {
  return (
    <Container>
      {recentThoughts().map((thought) => (
        <Thought key={thought.href} thought={thought} />
      ))}
    </Container>
  );
}
