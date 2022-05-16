import React from "react";
import Head from "next/head";
import { Container } from "react-bootstrap";

import { APP_CONSTANTS } from "src/constants";

export const DefaultLayout = (props) => {
  const { pageSEO, children } = props;

  return (
    <>
      <Head>
        <title>
          {pageSEO?.title ??
            `${APP_CONSTANTS.APP_NAME} - ${APP_CONSTANTS.APP_DESCRIPTION}`}
        </title>

        <meta
          name="description"
          content={pageSEO?.description ?? APP_CONSTANTS.APP_DESCRIPTION}
        />

        <meta
          name="keywords"
          content="Image, Photo, Crack, Crack Detection, Image Crack Detection, Building Image, Building Photo"
        />

        <meta name="image" content="assets/images/brand-logo.png" />

        <meta
          name="og:description"
          content={pageSEO?.description ?? APP_CONSTANTS.APP_DESCRIPTION}
        />

        <meta
          name="og:keywords"
          content="Image, Photo, Crack, Crack Detection, Image Crack Detection, Building Image, Building Photo"
        />

        <meta name="og:image" content="assets/images/brand-logo.png" />

        <meta
          name="twitter:description"
          content={pageSEO?.description ?? APP_CONSTANTS.APP_DESCRIPTION}
        />

        <meta
          name="twitter:keywords"
          content="Image, Photo, Crack, Crack Detection, Image Crack Detection, Building Image, Building Photo"
        />

        <meta name="twitter:image" content="assets/images/brand-logo.png" />
      </Head>

      <Container fluid className="default-layout-container">
        {children}
      </Container>
    </>
  );
};
