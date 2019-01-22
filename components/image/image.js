import React from 'react';

export default function Image({ src, ...rest }) {
  return (
    <picture>
      <source srcSet={`${src}.webp`} type="image/webp" />
      <img src={`${src}.png`} {...rest} />
    </picture>
  );
}
