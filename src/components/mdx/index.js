import { Code, H2, H3, H4, H5, H6, P, UL, OL } from '../blog-post';
import React from 'react';

const HIGHLIGHTS = /{(?<highlights>[\d,-]+)}/;

function highlightsFromMetastring(metastring) {
  if (!metastring) {
    return [];
  }

  const highlightsMatch = HIGHLIGHTS.exec(metastring);

  if (!highlightsMatch) {
    return [];
  }

  const highlights = highlightsMatch.groups.highlights;

  return highlights
    .split(',')
    .map((highlight) =>
      highlight.includes('-') ? highlight : parseInt(highlight, 10)
    );
}

function codePropsFromPreProps(preProps) {
  // look for <pre><code>some code string in here</code></pre>
  if (
    preProps.children &&
    preProps.children.props &&
    preProps.children.props.name === 'code'
  ) {
    const {
      children: code,
      props: { className, metastring, ...rest },
    } = preProps.children.props;

    const highlights = highlightsFromMetastring(metastring);

    return {
      code: code.trim(),
      language: className && className.split('-')[1],
      highlights,
      ...rest,
    };
  }

  return null;
}

export default {
  h1: (props) => <H2 {...props} />,
  h2: (props) => <H3 {...props} />,
  h3: (props) => <H4 {...props} />,
  h4: (props) => <H5 {...props} />,
  h5: (props) => <H6 {...props} />,
  h6: () => {
    throw new Error('Cannot nest heading that deep.');
  },
  p: (props) => <P {...props} />,
  ul: (props) => <UL {...props} />,
  ol: (props) => <OL {...props} />,
  pre: (preProps) => {
    const props = codePropsFromPreProps(preProps);

    if (props) {
      return <Code {...props} />;
    } else {
      return <pre {...preProps} />;
    }
  },
};
