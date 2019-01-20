import styled from "styled-components";

const A = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  font-size: 16px;
  font-size: 18px;
  font-weight: normal;
  line-height: 1.6;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export default A;
