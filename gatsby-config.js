module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "src/pages/vocab"
      }
    },
    {
      resolve: "gatsby-mdx",
      options: {
        extensions: [".md"]
      }
    }
  ]
};
