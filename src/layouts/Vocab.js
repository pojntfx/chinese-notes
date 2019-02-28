import React from "react";
import { Container } from "semantic-ui-react";
import Header from "../components/Header";
import Table from "../components/Table";

export default data => (
  <Container style={{ paddingTop: "1rem" }}>
    <Header
      title={`Vocab ${
        data.pageContext.tag
          ? `tagged "${data.pageContext.tag}"`
          : `from ${data.pageContext.date}`
      }`}
      header={
        <span>
          Vocab{" "}
          {data.pageContext.tag ? (
            <>
              tagged <i>"{data.pageContext.tag}"</i>
            </>
          ) : (
            `from ${data.pageContext.date}`
          )}
        </span>
      }
      subheader="Felicitas Pojtinger's Chinese Notes."
      searchActive={false}
    />
    <Table
      metaMetaVocab={[data.pageContext.vocabs]}
      noDate={!data.pageContext.tag}
      otherTags={data.pageContext.tag}
      primaryTag={data.pageContext.tag}
    />
  </Container>
);
