module.exports = {
  pathPrefix: '/',
  siteMetadata: {},
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
      resolve: `gatsby-mdx`,
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
              maxWidth: 1035,
            },
          },
        ],
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'yield(thoughts)',
        description: "Kyle Thompson's personal blog",
        short_name: 'yield(thoughts)',
        start_url: '/',
        background_color: '#EEEEEE',
        theme_color: '#054A91',
        display: 'standalone',
        icons: [
          {
            src: '/static/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-131529400-1',
      },
    },
    // {
    //   resolve: 'gatsby-plugin-typography',
    //   options: {
    //     pathToConfigModule: 'src/models/typography',
    //   },
    // },
    'gatsby-plugin-offline',
  ],
};
