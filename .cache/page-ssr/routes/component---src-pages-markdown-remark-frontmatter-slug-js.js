"use strict";
exports.id = "component---src-pages-markdown-remark-frontmatter-slug-js";
exports.ids = ["component---src-pages-markdown-remark-frontmatter-slug-js"];
exports.modules = {

/***/ "./src/pages/{MarkdownRemark.frontmatter__slug}.js?export=default":
/*!************************************************************************!*\
  !*** ./src/pages/{MarkdownRemark.frontmatter__slug}.js?export=default ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BlogPostTemplate)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function BlogPostTemplate({
  data: {
    markdownRemark
  }
}) {
  const {
    frontmatter,
    html
  } = markdownRemark;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h1", null, frontmatter.title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("img", {
    src: frontmatter.image,
    alt: "Project"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, frontmatter.stack), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "post-body",
    dangerouslySetInnerHTML: {
      __html: html
    }
  }));
}
const pageQuery = "3934660327";

/***/ })

};
;
//# sourceMappingURL=component---src-pages-markdown-remark-frontmatter-slug-js.js.map