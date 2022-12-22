/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  plugins: [
    'gatsby-plugin-postcss',
    'gatsby-plugin-react-helmet',
    `gatsby-plugin-netlify`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        icon: `src/assets/images/favicon.png`,
        name: `Asosiasi Informatika Indonesia`,
        short_name: `ASIN`,
        description: `Website resmi Asosiasi Informatika Indonesia`,
        start_url: `/`,
        background_color: `#FFFDF5`,
        theme_color: `#FFFDF5`,
        display: `standalone`,
        lang: `id`,
      },
    },
  ],
}
