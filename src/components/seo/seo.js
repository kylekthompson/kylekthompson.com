import React from 'react';
import defaultImage from '../../assets/images/default-meta-image.png';
import { Helmet } from 'react-helmet';
import { graphql, useStaticQuery } from 'gatsby';

export default function SEO({
  title,
  description = null,
  image = null,
  isArticle = false,
  slug = null,
  meta = [],
}) {
  const {
    site: { siteMetadata },
  } = useStaticQuery(METADATA_QUERY);

  const seoTitle = title || siteMetadata.title;
  const seoDescription = description || siteMetadata.description;
  const seoUrl = slug
    ? `${siteMetadata.url}/${slug.replace(/^\/{1}/, '')}`
    : siteMetadata.url;
  const seoImage = image ? `${siteMetadata.url}${image}` : `${siteMetadata.url}${defaultImage}`;

  const seoMeta = [
    {
      property: 'og:title',
      content: seoTitle,
    },
    {
      name: 'twitter:title',
      content: seoTitle,
    },
    {
      name: 'description',
      content: seoDescription,
    },
    {
      property: 'og:description',
      content: seoDescription,
    },
    {
      name: 'twitter:description',
      content: seoDescription,
    },
    {
      property: 'og:image',
      content: seoImage,
    },
    {
      name: 'twitter:image',
      content: seoImage,
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:creator',
      content: siteMetadata.author.twitter,
    },
    {
      property: 'og:url',
      content: seoUrl,
    },
  ];

  if (isArticle) {
    seoMeta.push({
      property: 'og:type',
      content: 'article',
    });
  }

  return <Helmet title={title} meta={[...seoMeta, ...meta]} />;
}

const METADATA_QUERY = graphql`
  query {
    site {
      siteMetadata {
        title
        description
        url
        author {
          twitter
        }
      }
    }
  }
`;
