"use strict";
exports.id = "component---src-pages-404-tsxhead";
exports.ids = ["component---src-pages-404-tsxhead"];
exports.modules = {

/***/ "./src/components/header.tsx":
/*!***********************************!*\
  !*** ./src/components/header.tsx ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var theme_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! theme-ui */ "./node_modules/@theme-ui/color-modes/dist/theme-ui-color-modes.esm.js");
/* harmony import */ var theme_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! theme-ui */ "./node_modules/theme-ui/dist/theme-ui.esm.js");
/* harmony import */ var theme_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! theme-ui */ "./node_modules/@theme-ui/components/dist/theme-ui-components.esm.js");
/* harmony import */ var _icons_logo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../icons/logo */ "./src/icons/logo.tsx");
/* harmony import */ var _icons_theme_switch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../icons/theme-switch */ "./src/icons/theme-switch.tsx");
/** @jsx jsx */



const modes = [`light`, `dark`, `strangerThings`];
const Header = () => {
  const [mode, setMode] = (0,theme_ui__WEBPACK_IMPORTED_MODULE_2__.useColorMode)();
  const cycleMode = e => {
    const i = (modes.indexOf(mode) + 1) % modes.length;
    setMode(modes[i]);
  };
  return (0,theme_ui__WEBPACK_IMPORTED_MODULE_3__.jsx)("header", null, (0,theme_ui__WEBPACK_IMPORTED_MODULE_3__.jsx)(theme_ui__WEBPACK_IMPORTED_MODULE_4__.Container, {
    sx: {
      pb: 0
    }
  }, (0,theme_ui__WEBPACK_IMPORTED_MODULE_3__.jsx)(theme_ui__WEBPACK_IMPORTED_MODULE_4__.Flex, {
    sx: {
      alignItems: `center`,
      justifyContent: `space-between`,
      flexDirection: [`column`, `row`]
    }
  }, (0,theme_ui__WEBPACK_IMPORTED_MODULE_3__.jsx)(theme_ui__WEBPACK_IMPORTED_MODULE_4__.Flex, null, (0,theme_ui__WEBPACK_IMPORTED_MODULE_3__.jsx)("a", {
    "aria-label": "Link to the site creator's website",
    sx: {
      color: `text`,
      "&:hover,&:focus": {
        color: `primary`,
        boxShadow: `none`
      }
    },
    href: "https://github.com/nasyrovt"
  }, (0,theme_ui__WEBPACK_IMPORTED_MODULE_3__.jsx)(_icons_logo__WEBPACK_IMPORTED_MODULE_0__["default"], {
    sx: {
      width: 70,
      height: 70
    }
  })), (0,theme_ui__WEBPACK_IMPORTED_MODULE_3__.jsx)(theme_ui__WEBPACK_IMPORTED_MODULE_4__.Box, {
    "aria-hidden": "true",
    sx: {
      height: 12,
      width: 1,
      backgroundColor: `primary`,
      borderRadius: `full`,
      mx: 3
    }
  }), (0,theme_ui__WEBPACK_IMPORTED_MODULE_3__.jsx)(theme_ui__WEBPACK_IMPORTED_MODULE_4__.Flex, {
    sx: {
      flexDirection: `column`
    }
  }, (0,theme_ui__WEBPACK_IMPORTED_MODULE_3__.jsx)(theme_ui__WEBPACK_IMPORTED_MODULE_4__.Box, {
    sx: {
      fontSize: 3,
      fontWeight: `semibold`,
      lineHeight: `25px`
    }
  }, "Welcome"), (0,theme_ui__WEBPACK_IMPORTED_MODULE_3__.jsx)(theme_ui__WEBPACK_IMPORTED_MODULE_4__.Box, {
    sx: {
      color: `dark`
    }
  }, "to my World"))), (0,theme_ui__WEBPACK_IMPORTED_MODULE_3__.jsx)(theme_ui__WEBPACK_IMPORTED_MODULE_4__.Flex, {
    sx: {
      mt: [4, 0],
      alignItems: `center`
    }
  }, (0,theme_ui__WEBPACK_IMPORTED_MODULE_3__.jsx)("a", {
    href: "https://github.com/nasyrovt",
    sx: {
      variant: `buttons.secondary`
    }
  }, "GitHub"), (0,theme_ui__WEBPACK_IMPORTED_MODULE_3__.jsx)("button", {
    type: "button",
    sx: {
      variant: `buttons.transparent`,
      p: 1,
      borderRadius: `full`,
      ml: 4,
      "&:hover,&:focus": {
        boxShadow: `0 0 0 2px`
      }
    },
    title: "Change color mode",
    onClick: cycleMode
  }, (0,theme_ui__WEBPACK_IMPORTED_MODULE_3__.jsx)(_icons_theme_switch__WEBPACK_IMPORTED_MODULE_1__["default"], null))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Header);

/***/ }),

/***/ "./src/components/layout.tsx":
/*!***********************************!*\
  !*** ./src/components/layout.tsx ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @emotion/react */ "./node_modules/@emotion/react/dist/emotion-react.esm.js");
/* harmony import */ var theme_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! theme-ui */ "./node_modules/@theme-ui/color-modes/dist/theme-ui-color-modes.esm.js");
/* harmony import */ var theme_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! theme-ui */ "./node_modules/@theme-ui/css/dist/theme-ui-css.esm.js");
/* harmony import */ var theme_ui__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! theme-ui */ "./node_modules/@theme-ui/components/dist/theme-ui-components.esm.js");
/* harmony import */ var _theme_ui_mdx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @theme-ui/mdx */ "./node_modules/@theme-ui/mdx/dist/theme-ui-mdx.esm.js");
/* harmony import */ var _header__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./header */ "./src/components/header.tsx");





const Layout = ({
  children,
  className = ``
}) => {
  const [mode] = (0,theme_ui__WEBPACK_IMPORTED_MODULE_2__.useColorMode)();
  let headingStyles = {};
  if (mode === `strangerThings`) {
    headingStyles = {
      "h1, h2, h3": {
        fontFamily: `Benguiat Bold !important`,
        textShadow: `-0.05rem -0.05rem 1px #ed2b12,
        0.05rem -0.05rem 1px #ed2b12,
        -0.05rem 0.05rem 1px #ed2b12,
        0.05rem 0.05rem 1px #ed2b12,
        0 0 15px #630100,
        0 0 20px #450100`
      }
    };
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_emotion_react__WEBPACK_IMPORTED_MODULE_3__.Global, {
    styles: t => ({
      "*": {
        boxSizing: `inherit`
      },
      "::selection": {
        backgroundColor: (0,theme_ui__WEBPACK_IMPORTED_MODULE_4__.get)(t, `colors.text`),
        color: (0,theme_ui__WEBPACK_IMPORTED_MODULE_4__.get)(t, `colors.background`)
      },
      "#___gatsby": {
        position: `relative`,
        overflowX: `hidden`
      },
      a: {
        transition: `all 0.3s ease-in-out`,
        textDecoration: `none`,
        outline: `none`,
        "&:focus": {
          boxShadow: (0,theme_ui__WEBPACK_IMPORTED_MODULE_4__.get)(t, `shadows.outline`)
        }
      },
      ...headingStyles
    })
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_header__WEBPACK_IMPORTED_MODULE_1__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(theme_ui__WEBPACK_IMPORTED_MODULE_5__.Box, {
    as: "main",
    className: className
  }, children), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(theme_ui__WEBPACK_IMPORTED_MODULE_5__.Box, {
    as: "footer",
    variant: "layout.footer"
  }, "\xA9 ", new Date().getFullYear(), " by", ` `, "Nasyrov Takhir. All rights reserved.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("br", null), "This template is open source on", ` `, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_theme_ui_mdx__WEBPACK_IMPORTED_MODULE_6__.Themed.a, {
    href: "https://github.com/LekoArts/gatsby-themes/tree/main/www"
  }, "GitHub"), "."));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Layout);

/***/ }),

/***/ "./src/components/seo.tsx":
/*!********************************!*\
  !*** ./src/components/seo.tsx ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _hooks_use_site_metadata__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../hooks/use-site-metadata */ "./src/hooks/use-site-metadata.tsx");


const SEO = ({
  description = ``,
  meta = [],
  pathname = ``,
  image = ``,
  title = ``
}) => {
  const site = (0,_hooks_use_site_metadata__WEBPACK_IMPORTED_MODULE_1__["default"])();
  const {
    title: defaultTitle,
    titleAlt: defaultTitleAlt,
    siteUrl,
    description: defaultDescription,
    headline,
    image: defaultImage,
    author
  } = site;
  const seo = {
    title: title || defaultTitleAlt,
    description: description || defaultDescription,
    url: `${siteUrl}${pathname || ``}`,
    image: `${siteUrl}${image || defaultImage}`
  };
  const schemaHomepage = {
    "@context": `http://schema.org`,
    "@type": `WebPage`,
    author: {
      "@id": `${siteUrl}/#identity`
    },
    copyrightHolder: {
      "@id": `${siteUrl}/#identity`
    },
    copyrightYear: `2019-07-17T23:33:12-05:00`,
    creator: {
      "@id": `${siteUrl}/#creator`
    },
    datePublished: `2019-07-17T23:33:12-05:00`,
    description: defaultDescription,
    headline,
    image: {
      "@type": `ImageObject`,
      url: seo.image
    },
    inLanguage: `en`,
    mainEntityOfPage: siteUrl,
    name: defaultTitleAlt,
    publisher: {
      "@id": `${siteUrl}/#creator`
    },
    url: siteUrl
  };
  const orgaCreator = input => ({
    "@context": `http://schema.org`,
    "@id": `${siteUrl}/#${input}`,
    "@type": `Organization`,
    address: {
      "@type": `PostalAddress`,
      addressCountry: `DE`,
      addressLocality: ``,
      postalCode: ``
    },
    name: defaultTitleAlt,
    alternateName: defaultTitle,
    description: defaultDescription,
    url: siteUrl,
    email: `hello@lekoarts.de`,
    founder: `LekoArts`,
    foundingDate: `2017-12-08`,
    foundingLocation: `Germany`,
    image: {
      "@type": `ImageObject`,
      url: `${siteUrl}/social/avatar.png`,
      height: `512`,
      width: `512`
    },
    logo: {
      "@type": `ImageObject`,
      url: `${siteUrl}/social/avatar_small.png`,
      height: `60`,
      width: `60`
    },
    sameAs: [`https://github.com/LekoArts`, `https://www.behance.net/lekoarts`, `https://dribbble.com/LekoArts`, `https://youtube.de/LekoArtsDE`, `https://twitter.com/lekoarts_de`]
  });
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("title", null, seo.title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("meta", {
    name: "description",
    content: seo.description
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("meta", {
    name: "image",
    content: seo.image
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("meta", {
    property: "og:title",
    content: seo.title
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("meta", {
    property: "og:url",
    content: seo.url
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("meta", {
    property: "og:description",
    content: seo.description
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("meta", {
    property: "og:image",
    content: seo.image
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("meta", {
    property: "og:type",
    content: "website"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("meta", {
    property: "og:image:alt",
    content: seo.description
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("meta", {
    name: "twitter:card",
    content: "summary_large_image"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("meta", {
    name: "twitter:title",
    content: seo.title
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("meta", {
    name: "twitter:url",
    content: seo.url
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("meta", {
    name: "twitter:description",
    content: seo.description
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("meta", {
    name: "twitter:image",
    content: seo.image
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("meta", {
    name: "twitter:image:alt",
    content: seo.description
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("meta", {
    name: "twitter:creator",
    content: author
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("meta", {
    name: "twitter:label1",
    value: "Support"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("meta", {
    name: "twitter:label2",
    value: "Author's Homepage"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("meta", {
    name: "twitter:data1",
    value: "https://github.com/sponsors/LekoArts"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("meta", {
    name: "twitter:data2",
    value: "https://www.lekoarts.de"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("link", {
    rel: "icon",
    type: "image/png",
    sizes: "32x32",
    href: "/favicon-32x32.png"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("link", {
    rel: "icon",
    type: "image/png",
    sizes: "16x16",
    href: "/favicon-16x16.png"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("link", {
    rel: "mask-icon",
    href: "/safari-pinned-tab.svg",
    color: "#5a67d8"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("meta", {
    name: "msapplication-TileColor",
    content: "#f7fafc"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("script", {
    type: "application/ld+json"
  }, JSON.stringify(orgaCreator(`identity`))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("script", {
    type: "application/ld+json"
  }, JSON.stringify(orgaCreator(`creator`))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("script", {
    type: "application/ld+json"
  }, JSON.stringify(schemaHomepage)));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SEO);

/***/ }),

/***/ "./src/hooks/use-site-metadata.tsx":
/*!*****************************************!*\
  !*** ./src/hooks/use-site-metadata.tsx ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _public_page_data_sq_d_2910112849_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../public/page-data/sq/d/2910112849.json */ "./public/page-data/sq/d/2910112849.json");

const useSiteMetadata = () => {
  const data = _public_page_data_sq_d_2910112849_json__WEBPACK_IMPORTED_MODULE_0__.data;
  return data.site.siteMetadata;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useSiteMetadata);

/***/ }),

/***/ "./src/icons/logo.tsx":
/*!****************************!*\
  !*** ./src/icons/logo.tsx ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const Logo = ({
  className = ``,
  hidden = true
}) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", {
  className: className,
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 150 150",
  "aria-hidden": hidden ? `true` : `false`,
  focusable: hidden ? `false` : `true`,
  "aria-label": hidden ? `` : `LekoArts Logo`,
  fill: "currentColor"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M17.647 0.427197C35.7353 7.34621 63.4191 9.41513 75 9.58472L75 89.4586C72.6103 88.2715 66.397 85.8974 60.6618 85.8974C62.6838 77.4182 64.6323 57.2038 56.25 44.1798C51.2868 43.1623 38.1618 42.3483 25.3676 47.2323C29.0441 50.9631 40.2573 58.4248 55.6985 58.4248C57.9044 62.6644 61.4338 75.1119 57.9044 90.9849C57.7206 92.0024 58.4559 94.0374 62.8676 94.0374C68.3823 94.0374 72.7941 95.5636 72.7941 103.704V120.492C70.7959 122.336 62.8375 126.498 46.8965 128.56C38.7469 113.023 25.1443 103.412 17.6471 100.142C20.0368 91.8328 21.1765 70.0243 6.61764 49.2673C-7.94118 28.5103 7.9044 8.05846 17.647 0.427197ZM75 89.4586L75 9.58472C86.5809 9.41513 114.265 7.34621 132.353 0.427197C142.096 8.05846 157.941 28.5103 143.382 49.2673C128.824 70.0243 129.963 91.8328 132.353 100.142C124.856 103.412 111.253 113.023 103.104 128.56C87.1625 126.498 79.2041 122.336 77.2059 120.492V103.704C77.2059 95.5636 81.6177 94.0374 87.1324 94.0374C91.5441 94.0374 92.2794 92.0024 92.0956 90.9849C88.5662 75.1119 92.0956 62.6644 94.3015 58.4248C109.743 58.4248 120.956 50.9631 124.632 47.2323C111.838 42.3483 98.7132 43.1623 93.75 44.1798C85.3677 57.2038 87.3162 77.4182 89.3382 85.8974C83.603 85.8974 77.3897 88.2715 75 89.4586ZM50.2092 136.096C54.9807 134.31 64.5209 131.685 75 131.685L75 150C64.4118 150 55.8823 148.304 52.9412 146.947C52.3649 143.108 51.4253 139.489 50.2092 136.096ZM75 131.685L75 150C85.5882 150 94.1177 148.304 97.0588 146.947C97.6351 143.108 98.5747 139.489 99.7908 136.096C95.0193 134.31 85.4791 131.685 75 131.685Z"
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Logo);

/***/ }),

/***/ "./src/icons/theme-switch.tsx":
/*!************************************!*\
  !*** ./src/icons/theme-switch.tsx ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const ThemeSwitch = () => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", {
  viewBox: "0 0 32 32",
  width: "24",
  height: "24",
  fill: "currentcolor",
  style: {
    display: `block`
  }
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("circle", {
  cx: "16",
  cy: "16",
  r: "14",
  fill: "none",
  stroke: "currentcolor",
  strokeWidth: "4"
}), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
  d: " M 16 0 A 16 16 0 0 0 16 32 z "
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ThemeSwitch);

/***/ }),

/***/ "./src/pages/404.tsx?export=head":
/*!***************************************!*\
  !*** ./src/pages/404.tsx?export=head ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Head": () => (/* binding */ Head),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var gatsby__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gatsby */ "./.cache/gatsby-browser-entry.js");
/* harmony import */ var theme_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! theme-ui */ "./node_modules/theme-ui/dist/theme-ui.esm.js");
/* harmony import */ var theme_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! theme-ui */ "./node_modules/@theme-ui/components/dist/theme-ui-components.esm.js");
/* harmony import */ var theme_ui__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! theme-ui */ "./node_modules/@theme-ui/css/dist/theme-ui-css.esm.js");
/* harmony import */ var _theme_ui_mdx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @theme-ui/mdx */ "./node_modules/@theme-ui/mdx/dist/theme-ui-mdx.esm.js");
/* harmony import */ var _components_layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/layout */ "./src/components/layout.tsx");
/* harmony import */ var _components_seo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/seo */ "./src/components/seo.tsx");
/** @jsx jsx */





const Index = () => (0,theme_ui__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components_layout__WEBPACK_IMPORTED_MODULE_1__["default"], null, (0,theme_ui__WEBPACK_IMPORTED_MODULE_3__.jsx)(theme_ui__WEBPACK_IMPORTED_MODULE_4__.Container, {
  sx: {
    my: 6,
    textAlign: `center`
  }
}, (0,theme_ui__WEBPACK_IMPORTED_MODULE_3__.jsx)(_theme_ui_mdx__WEBPACK_IMPORTED_MODULE_5__.Themed.h1, null, "404"), (0,theme_ui__WEBPACK_IMPORTED_MODULE_3__.jsx)(_theme_ui_mdx__WEBPACK_IMPORTED_MODULE_5__.Themed.p, null, "Page not found ", (0,theme_ui__WEBPACK_IMPORTED_MODULE_3__.jsx)("br", null), "Go back to", ` `, (0,theme_ui__WEBPACK_IMPORTED_MODULE_3__.jsx)(gatsby__WEBPACK_IMPORTED_MODULE_0__.Link, {
  sx: t => (0,theme_ui__WEBPACK_IMPORTED_MODULE_6__.get)(t, `styles.a`),
  to: "/"
}, "Home"))));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Index);
const Head = () => (0,theme_ui__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components_seo__WEBPACK_IMPORTED_MODULE_2__["default"], {
  title: "404 - Page Not Found"
});

/***/ }),

/***/ "./public/page-data/sq/d/2910112849.json":
/*!***********************************************!*\
  !*** ./public/page-data/sq/d/2910112849.json ***!
  \***********************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"data":{"site":{"siteMetadata":{"title":"GameDev Portfolio","titleAlt":"Takhir Nasyrov Portfolio","siteUrl":"https://tatakgame.dev","description":"Personal Portfolio built with TS, Gatsby and ThreeJS","headline":"Get to know the most motivated and passionate game developer","image":"/banner.png","author":"@taktakgamedev"}}}}');

/***/ })

};
;
//# sourceMappingURL=component---src-pages-404-tsxhead.js.map