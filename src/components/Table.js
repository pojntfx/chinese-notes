import React from "react";
import { Table, Label } from "semantic-ui-react";
import { Link } from "gatsby";

export default ({ metaMetaVocab, noDate, otherTags, primaryTag }) => (
  <Table>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Deutsch</Table.HeaderCell>
        <Table.HeaderCell>中文</Table.HeaderCell>
        {!noDate && <Table.HeaderCell>Date</Table.HeaderCell>}
        <Table.HeaderCell>{otherTags && "Other "}Tags</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {metaMetaVocab.map(metaVocab =>
        metaVocab.map((vocab, index) => (
          <Table.Row key={index}>
            <Table.Cell>{vocab.node.de}</Table.Cell>
            <Table.Cell>{vocab.node.zh}</Table.Cell>
            {!noDate && (
              <Table.Cell>
                <Link to={`/dates/${vocab.node.date}`}>
                  {new Date(vocab.node.date).toLocaleDateString()}
                </Link>
              </Table.Cell>
            )}
            <Table.Cell>
              {vocab.node.tags.split(",")[0] &&
                vocab.node.tags
                  .split(",")
                  .map((tag, index) =>
                    otherTags ? (
                      tag !== primaryTag && (
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
        ))
      )}
    </Table.Body>
  </Table>
);
