import Highlight, { defaultProps } from 'prism-react-renderer';
import React from 'react';
import styled from 'styled-components';
import vsDarkPlus from 'prism-react-renderer/themes/vsDarkPlus';

const Container = styled.div`
  float: left;
  min-width: 100%;
  overflow: auto;
  padding: 20px;
`;

const Pre = styled.pre`
  border-radius: 10px;
  font-family: monospace;
  margin-top: 30px;
  overflow: auto;
  width: 100%;
`;

function renderCode({ className, getLineProps, getTokenProps, style, tokens }) {
  return (
    <Pre className={className} style={style}>
      <Container>
        {tokens.map((line, i) => (
          <div {...getLineProps({ line, key: i })}>
            {line.map((token, key) => (
              <span {...getTokenProps({ token, key })} />
            ))}
          </div>
        ))}
      </Container>
    </Pre>
  );
}

export default function Code({ code, language }) {
  return (
    <Highlight {...defaultProps} code={code} language={language} theme={vsDarkPlus}>
      {renderCode}
    </Highlight>
  );
}
