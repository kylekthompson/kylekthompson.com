import Highlight, { defaultProps } from 'prism-react-renderer';
import Prism from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-javascript';
import React from 'react';
import styled, { css } from 'styled-components';
import theme from 'prism-react-renderer/themes/nightOwl';

const Pre = styled.pre`
  border-radius: 5px;
  font-family: monospace;
  font-size: 16px;
  line-height: 1.6;
  overflow: auto;
  padding: 10px 0;
  width: 100%;
`;

const Container = styled.div`
  float: left;
  min-width: 100%;
`;

const Line = styled.div`
  padding: 0 10px 0 0;

  ${({ highlighted, theme }) => {
    if (highlighted) {
      return css`
        background-color: ${theme.colors.sunsetOrangeTransparent};
        border-left: 5px solid ${theme.colors.sunsetOrange};
      `;
    }

    return css`
      border-left: 5px solid transparent;
    `;
  }}
`;

const LineNumber = styled.span`
  display: inline-block;
  width: 2em;
  user-select: none;
  opacity: 0.3;
  padding-left: 5px;
`;

function range(start, end) {
  return Array(end - start + 1)
    .fill()
    .map((_, index) => start + index);
}

function highlightAppliesToLine(highlight, lineNumber) {
  if (typeof highlight === 'number') {
    return highlight === lineNumber;
  }

  if (typeof highlight === 'string') {
    const [lower, upper] = highlight
      .split('-')
      .map((num) => parseInt(num, 10))
      .sort((left, right) => left - right);

    const lines = range(lower, upper);
    return lines.includes(lineNumber);
  }

  return false;
}

function isLineHighlighted(highlights, lineNumber) {
  return highlights.some((highlight) =>
    highlightAppliesToLine(highlight, lineNumber)
  );
}

export default function Code({
  code,
  language,
  className = '',
  highlights = [],
}) {
  return (
    <Highlight
      {...defaultProps}
      code={code}
      language={language}
      theme={theme}
      Prism={Prism}
    >
      {({
        className: highlightClassName,
        style,
        tokens,
        getLineProps,
        getTokenProps,
      }) => (
        <Pre
          className={[highlightClassName, className].join(' ').trim()}
          style={style}
        >
          <Container>
            {tokens.map((line, lineKey) => (
              <Line
                key={lineKey}
                highlighted={isLineHighlighted(highlights, lineKey + 1)}
                {...getLineProps({ line, key: lineKey })}
              >
                <LineNumber>{lineKey + 1}</LineNumber>
                {line.map((token, tokenKey) => (
                  <span
                    key={tokenKey}
                    {...getTokenProps({ token, key: tokenKey })}
                  />
                ))}
              </Line>
            ))}
          </Container>
        </Pre>
      )}
    </Highlight>
  );
}
