import H1 from '../typography/h1';
import H2 from '../typography/h2';
import Head from 'next/head';
import React from 'react';
import styled from 'styled-components';
import { formatPostDate } from '../../models/date';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
  max-width: 700px;
`;

const Title = styled(H1)`
  align-self: center;
  margin-bottom: 5px;
`;

const Date = styled(H2)`
  align-self: center;
  font-size: 14px;
`;

export default function BlogPost({ children, date, title }) {
  return (
    <Container>
      <Head>
        <title>yield([&#128173;, &#128173;, &#128173;]) - {title}</title>
      </Head>
      <Title>{title}</Title>
      <Date>{formatPostDate(date)}</Date>
      {children}
    </Container>
  );
}
