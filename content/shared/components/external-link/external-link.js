import React from 'react';

export default function ExternalLink({ children, href, ...rest }) {
  return (
    <a target="_blank" rel="noopener noreferrer" href={href} {...rest}>
      {children}
    </a>
  );
}
