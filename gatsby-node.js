exports.createPages = async ({ graphql, actions: { createPage } }) => {
  createVocabs(graphql, createPage);
};

createVocabs = async (graphql, createPage) => {
  const { data } = await graphql(`
    query AllVocabQuery {
      allVocabCsv {
        edges {
          node {
            de
            zh
            tags
            date
          }
        }
      }
    }
  `);
  const tagsWithoutDuplicates = [];
  data.allVocabCsv.edges.forEach(vocab => {
    const tags = vocab.node.tags.includes(",")
      ? vocab.node.tags.split(",")
      : [vocab.node.tags];
    tags.forEach(
      tag =>
        !tagsWithoutDuplicates.includes(tag) && tagsWithoutDuplicates.push(tag)
    );
  });
  const tagsWithVocab = tagsWithoutDuplicates.map(tag => ({
    tag,
    vocabs: data.allVocabCsv.edges.filter(vocab =>
      vocab.node.tags.includes(tag)
    )
  }));
  for (let tag of tagsWithVocab) {
    await createPage({
      path: `/tags/${tag.tag}`,
      component: `${__dirname}/src/layouts/Tag.js`,
      context: tag
    });
  }
};
