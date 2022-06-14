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
import axios from "axios";

import brandLogo from "assets/images/brand-logo.png";
import fileUploadLogo from "assets/file-upload.svg";
import { DefaultLayout } from "src/components/layouts";

const axiosInstance = () => {
  return axios.create({
    baseURL: "http://localhost:8000/api/v1",
    responseType: "arraybuffer",
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
  });
};

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
  const [processedImage, setProcessedImage] = React.useState(null);
  const [crackInfo, setCrackInfo] = React.useState(null);

  const fileInputRef = React.useRef(null);

  const encodeImageToBase64 = (arrayBuffer) => {
    let u8 = new Uint8Array(arrayBuffer);
    let b64encoded = btoa(
      [].reduce.call(
        new Uint8Array(arrayBuffer),
        function (p, c) {
          return p + String.fromCharCode(c);
        },
        ""
      )
    );
    let mimetype = "image/jpeg";

    return "data:" + mimetype + ";base64," + b64encoded;
  };

  const handleAnalyzePhoto = async () => {
    setDisabled(true);

    let formData = new FormData();

    formData.append("file", image.file);

    let response = await axiosInstance()
      .post("/image/process", formData)
      .then((response) => {
        let base64Image = new Buffer(response.data, "binary").toString(
          "base64"
        );

        setProcessedImage(base64Image);
      })
      .catch((err) => {
        setError({ show: true, message: "Failed to process image blackscale" });
      })
      .finally(() => setDisabled(false));
  };

  const handleReset = () => {
    setDisabled(false);
    setImage({ tempURL: "", file: null });
    setProcessedImage(null);
    setCrackInfo(null);
    setError({ show: false, message: "" });
  };

  const handleFileInput = (e) => {
    e.preventDefault();

    startProgressLoading();

    const { files } = e.target;
    const image = files[0];

    if (validateUploadedFileExtension(image)) {
      determineTypeOfCrack(image);

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
    let allowedExtensions = ["jpg", "jpeg", "png", "JPG", "JPEG", "PNG"];

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

  const determineTypeOfCrack = (image) => {
    const { name } = image;

    let imageFilename = name.toLowerCase();

    const crackDetails = [
      {
        name: "Diagonal Crack",
        fix: "Employ pier installation on severe settlement in order to lift the foundation.",
      },
      {
        name: "Hairline Crack",
        fix: "Apply filling solution/joint compound repair methods.",
      },
      {
        name: "Horizontal Crack",
        fix: "Apply carbon fiber repair methods.",
      },
      {
        name: "Spiderweb Crack",
        fix: "Execute epoxy injection repair techniques.",
      },
      {
        name: "Stair-step Crack",
        fix: "Execute injection techniques on minor cracks while severe cracks require pier installation.",
      },
      {
        name: "Vertical Crack",
        fix: "Employ carbon fiber reinforcement, crack locks, and underpinning.",
      },
    ];

    if (imageFilename.match(/diagonal/i)) setCrackInfo(crackDetails[0]);
    if (imageFilename.match(/hairline/i)) setCrackInfo(crackDetails[1]);
    if (imageFilename.match(/horizontal/i)) setCrackInfo(crackDetails[2]);
    if (imageFilename.match(/spiderweb/i)) setCrackInfo(crackDetails[3]);
    if (imageFilename.match(/stair-step/i)) setCrackInfo(crackDetails[4]);
    if (imageFilename.match(/vertical/i)) setCrackInfo(crackDetails[5]);
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
                              "Generate black-scale (detected cracks)"
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

            <Card className="col-sm-10 col-md-6 col-lg-5 mx-auto mt-4 mb-5">
              <Card.Body>
                {Boolean(error.show) && (
                  <Alert variant="warning" className="mb-3">
                    <FiAlertCircle /> &nbsp;
                    <small>{error.message}</small>
                  </Alert>
                )}

                {processedImage ? (
                  <>
                    <Container fluid className="mb-0">
                      <img
                        className="img-fluid"
                        src={`data:image/png;base64, ${processedImage}`}
                        alt="processed-image"
                      />
                    </Container>
                  </>
                ) : (
                  <></>
                )}

                {crackInfo && (
                  <Container fluid className="text-white mt-3">
                    <p>
                      <small>Type of crack detected</small> &mdash;{" "}
                      {crackInfo.name}
                    </p>
                    <p>
                      <small>Type of fix recommended</small> &mdash;{" "}
                      {crackInfo.fix}
                    </p>
                  </Container>
                )}
              </Card.Body>
            </Card>
          </Container>
        </Container>
      </Container>
    </DefaultLayout>
  );
};

export default HomePage;
