exports.createPages = async ({ graphql, actions: { createPage } }) => {
  createTags(graphql, createPage);
  createDates(graphql, createPage);
};

createTags = async (graphql, createPage) => {
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
      component: `${__dirname}/src/layouts/Vocab.js`,
      context: tag
    });
  }
};

createDates = async (graphql, createPage) => {
  const { data } = await graphql(`
    query AllDatesQuery {
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
  const vocabWithDates = [];
  for (let vocab of data.allVocabCsv.edges) {
    if (!vocab.node.date) {
      vocabWithDates[vocabWithDates.length - 1].push(vocab);
    } else {
      vocabWithDates.push([vocab]);
    }
  }
  for (let vocabs of vocabWithDates) {
    await createPage({
      path: `/dates/${vocabs[0].node.date}`,
      component: `${__dirname}/src/layouts/Vocab.js`,
      context: {
        date: vocabs[0].node.date,
        vocabs
      }
    });
  }
};
