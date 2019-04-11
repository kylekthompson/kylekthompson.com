import { css } from 'styled-components';

const normalText = css`
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.6;
`;

export default css`
  h1 {
    font-size: 2rem;
    font-weight: 700;
    line-height: 1.4;
  }

  h2 {
    font-size: 1.9rem;
    font-weight: 600;
    line-height: 1.4;
  }

  h3 {
    font-size: 1.6rem;
    font-weight: 600;
    line-height: 1.4;
  }

  h4 {
    font-size: 1.35rem;
    font-weight: 600;
    line-height: 1.4;
  }

  h5 {
    font-size: 1.15rem;
    font-weight: 600;
    line-height: 1.4;
  }

  h6 {
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.4;
  }

  a {
    ${normalText}
    color: ${({ theme }) => theme.colors.primary};
    cursor: pointer;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  em {
    ${normalText}
    font-style: italic;
  }

  code {
    ${normalText}
    background-color: ${({ theme }) => theme.colors.greys.light};
    border-radius: 5px;
    font-family: monospace;
    padding: 2px 5px;
  }

  li, p {
    ${normalText}
  }

  ol {
    ${normalText}
    list-style: decimal;
    margin-left: 20px;
  }

  ul {
    ${normalText}
    list-style: disc;
    margin-left: 20px;
  }
`;
