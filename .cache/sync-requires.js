
// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---cache-dev-404-page-js": preferDefault(require("E:\\www\\.cache\\dev-404-page.js")),
  "component---src-pages-404-tsx": preferDefault(require("E:\\www\\src\\pages\\404.tsx")),
  "component---src-pages-index-tsx": preferDefault(require("E:\\www\\src\\pages\\index.tsx")),
  "component---src-pages-markdown-remark-frontmatter-slug-js": preferDefault(require("E:\\www\\src\\pages\\{MarkdownRemark.frontmatter__slug}.js"))
}

