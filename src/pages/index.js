import React, { useState } from "react";
import "semantic-ui-css/semantic.min.css";
import { Container, Card, Icon, Tab, Input } from "semantic-ui-react";
import { Link, graphql } from "gatsby";
import Header from "../components/Header";

export default ({ data }) => {
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
  const [tagSearchQuery, setTagSearchQuery] = useState(
    (typeof window !== "undefined" &&
      window.localStorage.getItem("tagSearchQuery")) ||
      ""
  );
  const [dateSearchQuery, setDateSearchQuery] = useState(
    (typeof window !== "undefined" &&
      window.localStorage.getItem("dateSearchQuery")) ||
      ""
  );
  return (
    <Container style={{ paddingTop: "1rem" }}>
      <Header
        header="Felicitas Pojtinger's Chinese Notes"
        subheader={
          <>
            Notes from my Chinese learning journey (in German and Chinese).
            Contribute on{" "}
            <a href="https://gitlab.com/pojntfx/pojntfx/">
              <Icon name="gitlab" fitted /> GitLab
            </a>
            !
          </>
        }
        noClose
      />
      <Tab
        panes={[
          {
            menuItem: "By tags",
            render: () => (
              <>
                <Input
                  placeholder="Filter tags ..."
                  icon="filter"
                  fluid
                  style={{ marginBottom: "1em" }}
                  value={tagSearchQuery}
                  onChange={event => {
                    setTagSearchQuery(event.target.value);
                    window &&
                      window.localStorage.setItem(
                        "tagSearchQuery",
                        event.target.value
                      );
                  }}
                  autoFocus
                />
                <Card.Group>
                  {tagsWithoutDuplicates
                    .filter(tag => tag.includes(tagSearchQuery))
                    .map((tag, index) => (
                      <Card
                        header={tag}
                        to={`/tags/${tag}`}
                        link
                        fluid
                        as={Link}
                        key={index}
                      />
                    ))}
                </Card.Group>
              </>
            )
          },
          {
            menuItem: "By dates",
            render: () => (
              <>
                <Input
                  placeholder="Filter dates ..."
                  icon="filter"
                  fluid
                  style={{ marginBottom: "1em" }}
                  value={dateSearchQuery}
                  onChange={event => {
                    setDateSearchQuery(event.target.value);
                    window &&
                      window.localStorage.setItem(
                        "dateSearchQuery",
                        event.target.value
                      );
                  }}
                  autoFocus
                />
                <Card.Group>
                  {vocabWithAllDates
                    .reverse()
                    .filter(vocabs =>
                      vocabs[0].node.date.includes(dateSearchQuery)
                    )
                    .map((vocabs, index) => (
                      <Card
                        header={vocabs[0].node.date}
                        to={`/dates/${vocabs[0].node.date}`}
                        link
                        fluid
                        as={Link}
                        key={index}
                      />
                    ))}
                </Card.Group>
              </>
            )
          }
        ]}
        menu={{
          pointing: true,
          secondary: true
        }}
      />
    </Container>
  );
};

export const query = graphql`
  query IndexQuery {
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
