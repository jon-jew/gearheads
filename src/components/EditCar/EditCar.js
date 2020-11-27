import React, { useState, useCallback, useRef, useEffect } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import ImageUploading from "react-images-uploading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages, faPlusSquare } from "@fortawesome/free-regular-svg-icons";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { Row, Col, Form, FormControl, Modal, Button } from "react-bootstrap";
import "./EditCar.css";

import CarPicture from '../carPage/CarPicture.js';

// Increase pixel density for crop preview quality on retina screens.
const pixelRatio = window.devicePixelRatio || 1;

// We resize the canvas down when saving on retina devices otherwise the image
// will be double or triple the preview size.
function getResizedCanvas(canvas, newWidth, newHeight) {
  const tmpCanvas = document.createElement("canvas");
  tmpCanvas.width = newWidth;
  tmpCanvas.height = newHeight;

  const ctx = tmpCanvas.getContext("2d");
  ctx.drawImage(
    canvas,
    0,
    0,
    canvas.width,
    canvas.height,
    0,
    0,
    newWidth,
    newHeight
  );

  return tmpCanvas;
}

export default function EditCarForm({}) {
  const [previewPic, setPreviewPic] = useState("");
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [preview, setPreview] = useState(false);

  const [images, setImages] = React.useState([]);
  const maxNumber = 69;
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  function generateDownload(previewCanvas, crop) {
    if (!crop || !previewCanvas) {
      return;
    }

    const canvas = getResizedCanvas(previewCanvas, crop.width, crop.height);

    canvas.toBlob(
      (blob) => {
        const previewUrl = URL.createObjectURL(blob);
        setPreviewPic(previewUrl);
      },
      "image/png",
      1
    );
  }
  const background = {
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundImage: `url(${previewPic})`,
  };

  var styles = {
    backgroundAttachment: "fixed",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundImage: `url(${previewPic})`,
  };

  const [upImg, setUpImg] = useState();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({ unit: "%", width: 30, aspect: 16 / 9 });
  const [completedCrop, setCompletedCrop] = useState(null);

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setUpImg(reader.result);
        setPreviewPic(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    console.log(scaleX, scaleY);
    const ctx = canvas.getContext("2d");

    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
    generateDownload(previewCanvasRef.current, completedCrop);
  }, [completedCrop]);

  return (
    <div className="edit-car-container">
      <Button onClick={() => setPreview(!preview)} className="preview-btn">
        {preview ? <>Edit</> : <>Preview</>}
      </Button>
      <Button className="btn-success save-btn">Save</Button>
      {!preview ? (
        <div className="edit-car-form">
          <h1>EDIT CAR</h1>
          <div className="image-upload-container">
            <Form>
              <Form.Row className="justify-content-md-center car-model">
                <Col sm={1}>
                  <Form.Control
                    size="lg"
                    type="number"
                    min="1900"
                    max="2030"
                    step="1"
                    maxlength="4"
                    onChange={(e) => {
                      setYear(e.target.value);
                    }}
                    placeholder="Model Year"
                  />
                </Col>
                <Col sm={2}>
                  <Form.Control
                    size="lg"
                    onChange={(e) => {
                      setMake(e.target.value);
                    }}
                    placeholder="Make"
                  />
                </Col>
                <Col sm={2}>
                  <Form.Control
                    size="lg"
                    onChange={(e) => {
                      setModel(e.target.value);
                    }}
                    placeholder="Model"
                  />
                </Col>
                <Col sm={1}>
                  <Form.Control size="lg" placeholder="Trim" />
                </Col>
              </Form.Row>
            </Form>
            <Row>
              <Col s="10">
                <div className="file-upload">
                  <input type="file" accept="image/*" onChange={onSelectFile} />
                </div>
                <ReactCrop
                  src={upImg}
                  onImageLoaded={onLoad}
                  crop={crop}
                  onChange={(c) => setCrop(c)}
                  onComplete={(c) => setCompletedCrop(c)}
                  keepSelection
                />
                <canvas
                  className="upload-preview"
                  ref={previewCanvasRef}
                  // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
                  style={{
                    width: Math.round(completedCrop?.width ?? 0),
                    height: Math.round(completedCrop?.height ?? 0),
                  }}
                />
              </Col>
              <Col s="2" className="preview-container">
                <h3 className="preview-header">THUMBNAIL PREVIEW</h3>
                <div className="car-card">
                  <div className="card-overlay">
                    <div className="card-like">
                      <i className="fas fa-heart"></i> 22
                    </div>
                    <div className="car-overlay-title">
                      <span className="car-year">{year}</span>
                      <br />
                      {`${make} ${model}`}
                      <span className="car-user">
                        <i className="fas fa-user"></i> SPEEDYSPEEDBOI
                      </span>
                    </div>
                  </div>
                  <div className="card-photo" style={background}></div>
                </div>
              </Col>
            </Row>
            <Row>
              <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
              >
                {({
                  imageList,
                  onImageUpload,
                  onImageRemoveAll,
                  onImageUpdate,
                  onImageRemove,
                  isDragging,
                  dragProps,
                }) => (
                  // write your building UI
                  <div className="upload__image-wrapper">
                    Image Gallery 
                    <Button
                      style={isDragging ? { color: "red" } : null}
                      onClick={onImageUpload}
                      {...dragProps}
                    >
                      <FontAwesomeIcon icon={faUpload} />
                    </Button>
                    <br />
                    {imageList.map((image, index) => (
                      <div key={index} className="image-item">
                        <img src={image.data_url} alt="" width="300" />
                        <div className="image-item__btn-wrapper">
                          <Button onClick={() => onImageRemove(index)}>
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ImageUploading>
            </Row>
          </div>
        </div>
      ) : (
        <div className="car-header" id="page">
          <div className="header-photo-container" style={styles}>
            <div className="car-header-overlay">
              <div className="car-header-year">{year}</div>
              <div className="car-header-model">{`${make} ${model}`}</div>
              <div className="car-header-user">
                <i className="fas fa-user"></i> Speedy Speed Boi
              </div>
              <br />
            </div>
          </div>
          <div name="car-footer" className="car-footer">
            <Row>
              <Col xs={4} className="left-footer" id="123">
                <div className="left-header">
                  <span className="footer-user">
                    <i className="fas fa-user"></i> Speedy Speed Boi's
                    <br />
                  </span>
                  1988
                  <br />
                  <strong>MITSUBISHI</strong>
                  <br />
                  STARION GSR-VR
                </div>
                <input className="car-description"></input>
              </Col>
              <Col xs={8} className="right-footer">
                <div className="timeline-header">
                  <strong>
                    <i className="far fa-calendar"></i>
                  </strong>{" "}
                  | <i className="fas fa-thumbtack"></i>
                </div>
                <div className="pic-container">
                  {images.map((image, index) => (
                    <CarPicture key={index} pic={image.data_url} />
                  ))}
                </div>
              </Col>
            </Row>
          </div>
        </div>
      )}
    </div>
  );
}
