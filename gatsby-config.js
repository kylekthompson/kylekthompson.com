module.exports = {
  pathPrefix: '/',
  siteMetadata: {
    title: 'Kyle Thompson',
    description: "Kyle Thompson's personal website",
    url: 'https://kylekthompson.com',
    author: {
      twitter: '@kylekthomp',
    },
    facebook: {
      appId: '317388982278417',
    },
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'thoughts',
        path: `${__dirname}/content/thoughts`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src`,
        name: 'src',
      },
    },
    {
      resolve: 'gatsby-mdx',
      options: {
        defaultLayouts: {
          default: `${__dirname}/src/templates/markdown-page.js`,
        },
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-copy-linked-files',
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              backgroundColor: '#EEEEEE',
              maxWidth: 720,
            },
          },
        ],
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-catch-links',
    {
      resolve: 'gatsby-plugin-styled-components',
      options: {
        ssr: true,
        displayName: true,
        preprocess: false,
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Kyle Thompson',
        short_name: 'Kyle Thompson',
        description: "Kyle Thompson's personal website",
        start_url: '/',
        background_color: '#EEEEEE',
        theme_color: '#054A91',
        display: 'standalone',
        icon: 'src/assets/images/icon.png',
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-131529400-1',
      },
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-remove-trailing-slashes',
  ],
};
