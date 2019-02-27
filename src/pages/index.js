import React from "react";
import "semantic-ui-css/semantic.min.css";
import { Container, Header, Card, Icon } from "semantic-ui-react";
import { Link, graphql } from "gatsby";

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
      <Card.Group>
        {tagsWithoutDuplicates.map(tag => (
          <Card header={tag} to={`tags/${tag}`} link fluid as={Link} />
        ))}
      </Card.Group>
    </Container>
  );
};

export const query = graphql`
  query IndexVocabQuery {
    allVocabCsv {
      edges {
        node {
          tags
        }
      }
    }
  }
`;
