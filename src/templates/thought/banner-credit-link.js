import React from 'react';

export default function BannerCreditLink({ children, href, ...rest }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>{children}</a>;
}
