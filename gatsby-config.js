module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "data",
        path: "src/data"
      }
    },
    {
      resolve: "gatsby-transformer-csv",
      options: {
        delimiter: ";"
      }
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Felicitas Pojtinger's Chinese Notes",
        short_name: "Chinese Notes",
        start_url: "/",
        background_color: "#f7f7f7",
        theme_color: "#f7f7f7",
        display: "standalone",
        icon: "assets/icon.webp"
      }
    },
    "gatsby-plugin-offline",
    "gatsby-plugin-react-helmet"
  ]
};
