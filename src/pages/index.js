import React, { useState } from "react";
import "semantic-ui-css/semantic.min.css";
import { Container, Header, Card, Icon, Tab } from "semantic-ui-react";
import { Link, graphql } from "gatsby";

export default ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(
    window.localStorage.getItem("activeIndex") || 1
  );
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
  const vocabWithDates = [];
  for (let vocab of data.allVocabCsv.edges) {
    if (!vocab.node.date) {
      vocabWithDates[vocabWithDates.length - 1].push(vocab);
    } else {
      vocabWithDates.push([vocab]);
    }
  }
  return (
    <Container style={{ paddingTop: "1rem" }}>
      <Header textAlign="left">
        <Header.Content as="h1">Felicitas Pojtinger's Chinese Notes</Header.Content>
        <Header.Subheader>
          Notes from my Chinese learning journey (in German and Chinese).
          Contribute on{" "}
          <a href="https://gitlab.com/pojntfx/pojntfx/">
            <Icon name="gitlab" fitted /> GitLab
          </a>
          !
        </Header.Subheader>
      </Header>
      <Tab
        activeIndex={activeIndex}
        onTabChange={(_, data) => {
          setActiveIndex(data.activeIndex);
          window.localStorage.setItem("activeIndex", data.activeIndex);
        }}
        panes={[
          {
            menuItem: "By tag",
            render: () => (
              <Card.Group>
                {tagsWithoutDuplicates.map((tag, index) => (
                  <Card
                    header={tag}
                    to={`tags/${tag}`}
                    link
                    fluid
                    as={Link}
                    key={index}
                  />
                ))}
              </Card.Group>
            )
          },
          {
            menuItem: "By date",
            render: () => (
              <Card.Group>
                {vocabWithDates.reverse().map((vocabs, index) => (
                  <Card
                    header={vocabs[0].node.date}
                    to={`dates/${vocabs[0].node.date}`}
                    link
                    fluid
                    as={Link}
                    key={index}
                  />
                ))}
              </Card.Group>
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
  query IndexVocabQuery {
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
