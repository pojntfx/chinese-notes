import React from "react";
import { Header, Table, Label, Container, Button } from "semantic-ui-react";
import { Link } from "gatsby";

export default data => (
  <Container style={{ paddingTop: "1rem" }}>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        overflowX: "auto"
      }}
    >
      <Header
        content={
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
        subheader="Felicitas Pojtinger's Chinese Notes"
        as="h1"
        textAlign="left"
        floated="left"
        style={{
          whiteSpace: "nowrap"
        }}
      />
      <Button
        content="Close"
        icon="close"
        negative
        basic
        to="/"
        as={Link}
        floated="right"
        style={{
          whiteSpace: "nowrap"
        }}
      />
    </div>
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Deutsch</Table.HeaderCell>
          <Table.HeaderCell>中文</Table.HeaderCell>
          <Table.HeaderCell>
            {data.pageContext.tag ? "Other Tags" : "Tags"}
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.pageContext.vocabs.map((vocab, index) => (
          <Table.Row key={index}>
            <Table.Cell>{vocab.node.de}</Table.Cell>
            <Table.Cell>{vocab.node.zh}</Table.Cell>
            <Table.Cell>
              {vocab.node.tags
                .split(",")
                .map((tag, index) =>
                  data.pageContext.tag ? (
                    tag !== data.pageContext.tag && (
                      <Label
                        to={`/tags/${tag}`}
                        as={Link}
                        content={tag}
                        key={index}
                      />
                    )
                  ) : (
                    <Label
                      to={`/tags/${tag}`}
                      as={Link}
                      content={tag}
                      key={index}
                    />
                  )
                )}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  </Container>
);
