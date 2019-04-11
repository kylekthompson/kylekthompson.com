import ActualCode from '../code';
import styled, { css } from 'styled-components';

const BLOG_MARGIN = css`
  margin-bottom: 30px;
`;

export const Title = styled.h1`
  text-align: center;
  margin: 20px 0 5px;
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

export const H3 = styled.h3`
  ${BLOG_MARGIN}
`;

export const H4 = styled.h4`
  ${BLOG_MARGIN}
`;

export const H5 = styled.h5`
  ${BLOG_MARGIN}
`;

export const H6 = styled.h6`
  ${BLOG_MARGIN}
`;

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
