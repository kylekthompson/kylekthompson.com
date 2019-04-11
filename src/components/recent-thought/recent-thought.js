import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

const Container = styled.div`
  margin-bottom: 30px;
  max-width: 500px;
`;

const RecentTitle = styled.h3`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: 5px;
`;

const RecentLink = styled(Link)`
  color: ${({ theme }) => theme.colors.accent};
`;

const ReadMoreLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
`;

const RecentExcerpt = styled.p`
  display: inline-block;
`;

export default function RecentThought({ thought }) {
  return (
    <Container>
      <RecentLink to={thought.fields.slug}>
        <RecentTitle>{thought.fields.title}</RecentTitle>
      </RecentLink>
      <RecentExcerpt>
        {thought.excerpt}{' '}
        <ReadMoreLink to={thought.fields.slug}>read more</ReadMoreLink>
      </RecentExcerpt>
    </Container>
  );
}
