import React from "react";
import Head from "next/head";
import { Container } from "react-bootstrap";

import { APP_CONSTANTS } from "src/constants";

export const DefaultLayout = (props) => {
  const { pageSEO, children } = props;

  return (
    <>
      <Head>
        <title>{pageSEO.title ?? APP_CONSTANTS.APP_NAME}</title>

        <meta
          name="og:description"
          content={pageSEO.description ?? APP_CONSTANTS.APP_DESCRIPTION}
        />
      </Head>

      <Container fluid className="default-layout-container">
        {children}
      </Container>
    </>
  );
};
