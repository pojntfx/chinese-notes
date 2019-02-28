exports.createPages = async ({ graphql, actions: { createPage } }) => {
  createTags(graphql, createPage);
  createDates(graphql, createPage);
};

createTags = async (graphql, createPage) => {
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
  const vocabWithOneDate = [];
  data.allVocabCsv.edges.forEach(vocab =>
    !vocab.node.date
      ? vocabWithOneDate[vocabWithOneDate.length - 1].push(vocab)
      : vocabWithOneDate.push([vocab])
  );
  const vocabWithAllDates = vocabWithOneDate.map(vocabs =>
    vocabs.map(vocab => {
      const date = vocabs[0].node.date;
      return {
        node: { ...vocab.node, date }
      };
    })
  );
  const tagsWithoutDuplicates = [];
  vocabWithAllDates.forEach(vocabs =>
    vocabs.forEach(vocab => {
      const tags = vocab.node.tags.includes(",")
        ? vocab.node.tags.split(",")
        : [vocab.node.tags];
      tags.forEach(
        tag =>
          tag &&
          !tagsWithoutDuplicates.includes(tag) &&
          tagsWithoutDuplicates.push(tag)
      );
    })
  );
  const vocabWithAllTags = [];
  tagsWithoutDuplicates.forEach(tag => {
    const vocabWithTag = [];
    vocabWithAllDates.forEach(vocabs =>
      vocabs.forEach(
        vocab =>
          vocab.node.tags.includes(tag) && vocabWithTag.push({ ...vocab, tag })
      )
    );
    vocabWithAllTags.push(vocabWithTag);
  });
  vocabWithAllTags.forEach(
    async vocabs =>
      await createPage({
        path: `/tags/${vocabs[0].tag}`,
        component: `${__dirname}/src/layouts/Vocab.js`,
        context: {
          tag: vocabs[0].tag,
          vocabs
        }
      })
  );
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
  const vocabWithOneDate = [];
  data.allVocabCsv.edges.forEach(vocab =>
    !vocab.node.date
      ? vocabWithOneDate[vocabWithOneDate.length - 1].push(vocab)
      : vocabWithOneDate.push([vocab])
  );
  const vocabWithAllDates = vocabWithOneDate.map(vocabs =>
    vocabs.map(vocab => {
      const date = vocabs[0].node.date;
      return {
        node: { ...vocab.node, date }
      };
    })
  );
  vocabWithAllDates.forEach(
    async vocabs =>
      await createPage({
        path: `/dates/${vocabs[0].node.date}`,
        component: `${__dirname}/src/layouts/Vocab.js`,
        context: {
          date: vocabs[0].node.date,
          vocabs
        }
      })
  );
};
