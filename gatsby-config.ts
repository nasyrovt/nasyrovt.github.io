import type { GatsbyConfig, PluginRef } from "gatsby"
// @ts-ignore
import path from "path"
import "dotenv/config"

// const shouldAnalyseBundle = process.env.ANALYSE_BUNDLE
// const googleTagId = process.env.GOOGLE_PROPERTY_ID
const githubToken = process.env.GITHUB_TOKEN

const config: GatsbyConfig = {
  siteMetadata: {
    title: `GameDev Portfolio`,
    titleAlt: `Takhir Nasyrov Portfolio`,
    siteUrl: `https://tatakgame.dev`,
    description: `Personal Portfolio built with TS, Gatsby and ThreeJS`,
    headline: `Get to know the most motivated and passionate game developer`,
    image: `/banner.png`,
    author: `@taktakgamedev`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: path.resolve(`data`), // First approach to give absolute path
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `projects`,
        path: `${__dirname}/src/markdown`, // Second approach to give absolute path
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `projectImages`,
        path: `${__dirname}/data/projectImages`, // Second approach to give absolute path
      },
    },
    `gatsby-transformer-remark`,
    githubToken && {
      resolve: `gatsby-source-github-api`,
      options: {
        token: githubToken,
        variables: {},
        graphQLQuery: `
          query {
            repository(owner: "nasyrovt", name: "React-portfolio") {
              stargazers {
                totalCount
              }
            }
          }
        `,
      },
    },
    // googleTagId && {
    //   resolve: `gatsby-plugin-google-gtag`,
    //   options: {
    //     trackingIds: [process.env.GOOGLE_PROPERTY_ID],
    //     pluginConfig: {
    //       head: true,
    //     },
    //   },
    // },
    {
      resolve: `gatsby-transformer-yaml`,
      options: {
        typeName: `Themes`,
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-catch-links`,
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/`,
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-theme-ui`,
    // {
    //   resolve: `gatsby-plugin-manifest`,
    //   options: {
    //     name: `Free & Open Source Gatsby Themes by LekoArts`,
    //     short_name: `GatsbyThemes`,
    //     description: `Get high-quality and customizable Gatsby themes to quickly bootstrap your website! Choose from many professionally created and impressive designs with a wide variety of features and customization options. Use Gatsby Themes to take your project to the next level and let you and your customers take advantage of the many benefits Gatsby has to offer.`,
    //     start_url: `/`,
    //     background_color: `#fff`,
    //     display: `standalone`,
    //     icons: [
    //       {
    //         src: `/android-chrome-192x192.png`,
    //         sizes: `192x192`,
    //         type: `image/png`,
    //       },
    //       {
    //         src: `/android-chrome-512x512.png`,
    //         sizes: `512x512`,
    //         type: `image/png`,
    //       },
    //     ],
    //   },
    // },
    // shouldAnalyseBundle && {
    //   resolve: `gatsby-plugin-webpack-bundle-analyser-v2`,
    //   options: {
    //     analyzerMode: `static`,
    //     reportFilename: `_bundle.html`,
    //     openAnalyzer: false,
    //   },
    // },
  ].filter(Boolean) as PluginRef[],
}

export default config
