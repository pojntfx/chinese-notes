import React from "react";
import { Header, Button } from "semantic-ui-react";
import { Link } from "gatsby";

export default ({ header, subheader, searchActive, noClose }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      overflowX: "auto"
    }}
  >
    <Header
      textAlign="left"
      floated="left"
      style={{
        whiteSpace: "nowrap"
      }}
    >
      <Header.Content as="h1">{header}</Header.Content>
      <Header.Subheader>{subheader}</Header.Subheader>
    </Header>
    <div>
      {!noClose && (
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
      )}
      <Button
        content="Search"
        icon="search"
        basic
        to="/search"
        as={Link}
        floated="right"
        style={{
          whiteSpace: "nowrap"
        }}
        active={searchActive}
      />
    </div>
  </div>
);
