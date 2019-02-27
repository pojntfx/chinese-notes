import React from "react";
import "semantic-ui-css/semantic.min.css";
import { Container, Header, Card } from "semantic-ui-react";
import { Link, graphql } from "gatsby";

export default ({
  data: {
    allMdx: { edges: vocabs }
  }
}) => (
  <Container style={{ paddingTop: "1rem" }}>
    <Header
      content="Felicitas Pojtinger's Chinese Notes"
      subheader="Notes from my Chinese learning journey (in German and Chinese)."
      as="h1"
      textAlign="left"
    />
    <Card.Group>
      {vocabs.map(vocab => (
        <Card
          header={vocab.node.headings[0].value}
          to={`vocab/${vocab.node.parent.name}`}
          link
          fluid
          as={Link}
        />
      ))}
    </Card.Group>
  </Container>
);

export const query = graphql`
  query MDXQuery {
    allMdx {
      edges {
        node {
          parent {
            ... on File {
              name
            }
          }
          headings {
            value
          }
        }
      }
    }
  }
`;
