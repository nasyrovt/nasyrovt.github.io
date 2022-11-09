// @ts-ignore
import React from "react"
import useSiteMetadata from "../hooks/use-site-metadata"

type SEOProps = {
  description?: string
  meta?:
    | {
        property: string
        content: string
        name?: undefined
      }[]
    | {
        name: string
        content: string
        property?: undefined
      }[]
    | any
  pathname?: string
  image?: string
  title?: string
}

const SEO = ({ description = ``, meta = [], pathname = ``, image = ``, title = `` }: SEOProps) => {
  const site = useSiteMetadata()

  const {
    title: defaultTitle,
    titleAlt: defaultTitleAlt,
    siteUrl,
    description: defaultDescription,
    headline,
    image: defaultImage,
    author,
  } = site

  const seo = {
    title: title || defaultTitleAlt,
    description: description || defaultDescription,
    url: `${siteUrl}${pathname || ``}`,
    image: `${siteUrl}${image || defaultImage}`,
  }

  const schemaHomepage = {
    "@context": `http://schema.org`,
    "@type": `WebPage`,
    author: {
      "@id": `${siteUrl}/#identity`,
    },
    copyrightHolder: {
      "@id": `${siteUrl}/#identity`,
    },
    copyrightYear: `2019-07-17T23:33:12-05:00`,
    creator: {
      "@id": `${siteUrl}/#creator`,
    },
    datePublished: `2019-07-17T23:33:12-05:00`,
    description: defaultDescription,
    headline,
    image: {
      "@type": `ImageObject`,
      url: seo.image,
    },
    inLanguage: `en`,
    mainEntityOfPage: siteUrl,
    name: defaultTitleAlt,
    publisher: {
      "@id": `${siteUrl}/#creator`,
    },
    url: siteUrl,
  }

  const orgaCreator = (input: string) => ({
    "@context": `http://schema.org`,
    "@id": `${siteUrl}/#${input}`,
    "@type": `Organization`,
    address: {
      "@type": `PostalAddress`,
      addressCountry: `FR`,
      addressLocality: ``,
      postalCode: ``,
    },
    name: defaultTitleAlt,
    alternateName: defaultTitle,
    description: defaultDescription,
    url: siteUrl,
    email: `tahanasyrov@gmail.com`,
    founder: `Nasyrov Takhir`,
    foundingDate: `2022-10-10`,
    foundingLocation: `France`,
    image: {
      "@type": `ImageObject`,
      url: `${siteUrl}/social/avatar.png`,
      height: `512`,
      width: `512`,
    },
    logo: {
      "@type": `ImageObject`,
      url: `${siteUrl}/social/avatar_small.png`,
      height: `60`,
      width: `60`,
    },
    sameAs: [
      `https://github.com/nasyrovt`
    ],
  })

  return (
    <>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:type" content="website" />
      <meta property="og:image:alt" content={seo.description} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:image:alt" content={seo.description} />
      <meta name="twitter:creator" content={author} />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5a67d8" />
      <meta name="msapplication-TileColor" content="#f7fafc" />
      <script type="application/ld+json">{JSON.stringify(orgaCreator(`identity`))}</script>
      <script type="application/ld+json">{JSON.stringify(orgaCreator(`creator`))}</script>
      <script type="application/ld+json">{JSON.stringify(schemaHomepage)}</script>
    </>
  )
}

export default SEO
