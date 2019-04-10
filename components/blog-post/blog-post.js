import H1 from '../typography/h1';
import P from '../typography/p';
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

const Date = styled(P)`
  align-self: center;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.25;
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
