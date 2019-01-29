import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/styles/prism';

const STYLE = {
  borderRadius: '10px',
  fontFamily: 'monospace',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '30px 0 0',
  overflow: 'auto',
  width: '100%',
};

export default function Code({ code, language }) {
  return (
    <SyntaxHighlighter
      language={language}
      style={atomDark}
      customStyle={STYLE}
    >
      {code}
    </SyntaxHighlighter>
  );
}
