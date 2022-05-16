import React from "react";
import {
  Container,
  Card,
  Image,
  Row,
  Col,
  Spinner,
  Alert,
} from "react-bootstrap";
import { FiAlertCircle } from "react-icons/fi";
import LoadingBar from "react-top-loading-bar";

import brandLogo from "assets/images/brand-logo.png";
import fileUploadLogo from "assets/file-upload.svg";
import { DefaultLayout } from "src/components/layouts";

const ButtonLoadingComponent = () => {
  return <Spinner animation="border" variant="light" size="sm" />;
};

const HomePage = () => {
  const [error, setError] = React.useState({ show: false, message: "" });
  const [disabled, setDisabled] = React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [image, setImage] = React.useState({
    tempURL: "",
    file: null,
  });
  const fileInputRef = React.useRef(null);

  const handleAnalyzePhoto = () => {
    setDisabled(true);

    // TODO: !!FINAL!! - Integrate backend API for the image crack detection algo library
  };

  const handleReset = () => {
    setDisabled(false);
    setImage({ tempURL: "", file: null });
  };

  const handleFileInput = (e) => {
    e.preventDefault();

    startProgressLoading();

    const { files } = e.target;
    const image = files[0];

    if (validateUploadedFileExtension(image)) {
      setImage({
        tempURL: URL.createObjectURL(image),
        file: image,
      });
    }
  };

  const handleFileOnDrop = (e) => {
    e.stopPropagation();
    e.preventDefault();

    resetError();
    startProgressLoading();

    const { files } = e.dataTransfer;
    const image = files[0];

    if (validateUploadedFileExtension(image)) {
      setImage({
        tempURL: URL.createObjectURL(image),
        file: image,
      });
    }
  };

  const handleOnDragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleDragEnter = (e) => {
    e.stopPropagation();
  };

  const handleOpenFileInput = () => {
    resetError();
    fileInputRef.current.click();
  };

  const startProgressLoading = () => {
    for (let p = 0; p <= 100; p++) {
      setUploadProgress(p);
    }
  };

  const validateUploadedFileExtension = (file) => {
    const { name } = file;
    let allowedExtensions = ["jpg", "jpeg", "png"];

    const fileName = name;
    const fileExtension = fileName.split(".")[fileName.split(".").length - 1];

    if (allowedExtensions.includes(fileExtension)) {
      return true;
    } else {
      setError({
        show: true,
        message:
          "ERROR: File upload must be be a file type of (.jpg, .jpeg, .png)",
      });
    }
  };

  const resetError = () => {
    setError({ show: false, message: "" });
  };

  return (
    <DefaultLayout>
      <LoadingBar color="#1976D2" progress={uploadProgress} />

      <Container fluid className="main-section-container">
        <Container
          fluid
          className="file-upload-container"
          onDragOver={handleOnDragOver}
          onDragEnter={handleDragEnter}
          onDrop={handleFileOnDrop}
        >
          <div className="col-8 col-md-2 mx-auto">
            <Image src={brandLogo.src} alt="brand-logo" fluid />
          </div>

          <Container fluid>
            <Card className="col-sm-10 col-md-6 col-lg-5 mx-auto">
              <Card.Body>
                {Boolean(error.show) && (
                  <Alert variant="danger" className="mb-3">
                    <FiAlertCircle /> &nbsp;
                    <small>{error.message}</small>
                  </Alert>
                )}

                <Row>
                  <Col md={3}>
                    <Image
                      src={fileUploadLogo.src}
                      alt="file-upload-logo"
                      fluid
                    />
                  </Col>

                  <Col md={9}>
                    {Boolean(image.file === null) && (
                      <Container fluid className="file-drag-drop-container">
                        <p>
                          Drag an image to upload or click{" "}
                          <button onClick={handleOpenFileInput}>here</button>
                        </p>

                        <input
                          type="file"
                          name="image_file_input"
                          id="image_file_input"
                          onChange={(e) => handleFileInput(e)}
                          ref={fileInputRef}
                          hidden
                        />
                      </Container>
                    )}

                    {Boolean(image.file !== null) && (
                      <Container className="file-image-preview-container">
                        <Container className="image-container">
                          <Image
                            src={image.tempURL}
                            alt="upload-image-file"
                            fluid
                          />
                        </Container>

                        <Container fluid className="btn-container">
                          <button
                            className="btn-analyze"
                            onClick={handleAnalyzePhoto}
                            disabled={disabled}
                          >
                            {disabled ? (
                              <ButtonLoadingComponent />
                            ) : (
                              "Analyze Photo"
                            )}
                          </button>

                          <button className="btn-reset" onClick={handleReset}>
                            Reset
                          </button>
                        </Container>
                      </Container>
                    )}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Container>
        </Container>
      </Container>
    </DefaultLayout>
  );
};

export default HomePage;
