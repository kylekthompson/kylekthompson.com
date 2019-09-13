import { Code, Heading, P, UL, OL } from '../blog-post';
import React from 'react';

const HIGHLIGHTS = /{(?<highlights>[\d,-]+)}/;
const LANGUAGE = /language-(?<language>.*)/;

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
    preProps.children.props.mdxType === 'code'
  ) {
    const {
      children: code,
      className,
      metastring,
      ...rest
    } = preProps.children.props;

    const highlights = highlightsFromMetastring(metastring);
    const matches = className.match(LANGUAGE);
    const language =
      matches && matches.groups && matches.groups.language
        ? matches.groups.language
        : '';

    return {
      code: code.trim(),
      language,
      highlights,
      ...rest,
    };
  }

  return null;
}

export default {
  h1: (props) => <Heading as="h2" {...props} />,
  h2: (props) => <Heading as="h3" {...props} />,
  h3: (props) => <Heading as="h4" {...props} />,
  h4: (props) => <Heading as="h5" {...props} />,
  h5: (props) => <Heading as="h6" {...props} />,
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
