import styled from 'styled-components';

const InlineCode = styled.code`
  background-color: ${({ theme }) => theme.colors.greys.light};
  border-radius: 5px;
  font-family: monospace;
  font-size: 18px;
  font-weight: normal;
  line-height: 1.6;
  padding: 2px 5px;
`;

export default InlineCode;
