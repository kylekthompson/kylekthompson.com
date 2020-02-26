import ActualCode from '../code';
import React from 'react';
import styled, { css } from 'styled-components';

const BLOG_MARGIN = css`
  margin-bottom: 30px;
`;

export const Title = styled.h1`
  text-align: center;
  margin: 20px 0 10px;
`;

export const PostMeta = styled.p`
  text-align: center;
  font-size: 0.9rem;
  font-weight: 600;
  ${BLOG_MARGIN}
`;

export const BannerCreditWrapper = styled.div`
  text-align: center;
  font-size: 0.9rem;
  ${BLOG_MARGIN}
`;

export const H2 = styled.h2`
  ${BLOG_MARGIN}
`;

const HeadingLink = styled.a`
  color: ${({ theme }) => theme.colors.offBlack};
`;

export function Heading({ children, ...rest }) {
  const withoutSpecialCharacters = children
    .toLowerCase()
    .replace(/[^\sa-z0-9-_]+/g, '');
  const id = withoutSpecialCharacters.replace(/\s+/g, '-').replace(/-+/g, '-');

  return (
    <HeadingLink href={`#${id}`}>
      <H2 id={id} {...rest}>
        {children}
      </H2>
    </HeadingLink>
  );
}

export const P = styled.p`
  ${BLOG_MARGIN}
`;

export const UL = styled.ul`
  ${BLOG_MARGIN}
`;

export const OL = styled.ol`
  ${BLOG_MARGIN}
`;

export const Code = styled(ActualCode)`
  ${BLOG_MARGIN}
`;
