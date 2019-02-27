import React, { useState } from "react";
import { Container, Input } from "semantic-ui-react";
import { graphql } from "gatsby";
import Header from "../components/Header";
import Table from "../components/Table";

export default ({ data }) => {
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
  const [globalSearchQuery, setGlobalSearchQuery] = useState(
    (typeof window !== "undefined" &&
      window.localStorage.getItem("globalSearchQuery")) ||
      ""
  );
  const globalSearchResult = vocabWithAllDates.map(vocabs =>
    vocabs.filter(
      vocab =>
        vocab.node.de
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(globalSearchQuery.toLowerCase().replace(/\s+/g, "")) ||
        vocab.node.zh
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(globalSearchQuery.toLowerCase().replace(/\s+/g, "")) ||
        vocab.node.tags
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(globalSearchQuery.toLowerCase().replace(/\s+/g, "")) ||
        vocab.node.date
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(globalSearchQuery.toLowerCase().replace(/\s+/g, ""))
    )
  );
  return (
    <Container style={{ paddingTop: "1rem" }}>
      <Header
        header="Global Search"
        subheader="Felicitas Pojtinger's Chinese Notes"
        searchActive={true}
      />
      <Input
        placeholder="Search all vocab for German, Chinese, a date, tag, ..."
        icon="search"
        fluid
        autoFocus
        style={{ marginBottom: "1em", marginTop: "1em" }}
        value={globalSearchQuery}
        onChange={event => {
          setGlobalSearchQuery(event.target.value);
          typeof window !== "undefined" &&
            window.localStorage.setItem(
              "globalSearchQuery",
              event.target.value
            );
        }}
      />
      {globalSearchQuery !== "" &&
        /-.*-/g.test(JSON.stringify(globalSearchResult)) && (
          <Table metaMetaVocab={globalSearchResult} />
        )}
    </Container>
  );
};

export const query = graphql`
  query SearchQuery {
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
`;
