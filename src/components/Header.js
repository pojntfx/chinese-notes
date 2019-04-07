import React from "react";
import { Header, Button, Flag, Icon } from "semantic-ui-react";
import { Link } from "gatsby";
import Helmet from "react-helmet";

export default ({ header, subheader, searchActive, noClose, title }) => (
  <>
    <div style={{ paddingTop: "1em", paddingBottom: "1em", overflowX: "auto" }}>
      <Helmet>
        <title>{`${title} | Felicitas Pojtinger's Chinese Notes`}</title>
      </Helmet>
      <Header
        textAlign="center"
        style={{
          whiteSpace: "nowrap"
        }}
      >
        <Header.Content as="h1">{header}</Header.Content>
        <Header.Subheader>
          <Flag name="cn" /> {subheader} Contribute on{" "}
          <a href="https://gitlab.com/pojntfx/pojntfx/">
            <Icon name="gitlab" fitted /> GitLab
          </a>
          !
        </Header.Subheader>
      </Header>
    </div>
    <div
      style={{
        paddingTop: "1em",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        overflowX: "auto",
        paddingBottom: "1em"
      }}
    >
      <Button
        content="Search"
        icon="search"
        to="/search"
        as={Link}
        floated="right"
        style={{
          whiteSpace: "nowrap"
        }}
        active={searchActive}
      />
      {!noClose && (
        <Button
          content="Close"
          icon="close"
          negative
          to="/"
          as={Link}
          floated="right"
          style={{
            whiteSpace: "nowrap"
          }}
        />
      )}
    </div>
  </>
);
