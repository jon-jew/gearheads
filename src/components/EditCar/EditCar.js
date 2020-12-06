import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useReducer,
} from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import ImageUploading from "react-images-uploading";
import Fuse from "fuse.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  faImages,
  faPlusSquare,
  faImage,
  faSave,
} from "@fortawesome/free-regular-svg-icons";
import {
  faUpload,
  faCarAlt,
  faCogs,
  faThumbtack,
} from "@fortawesome/free-solid-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import {
  Row,
  Col,
  Form,
  FormControl,
  Modal,
  Button,
  InputGroup,
} from "react-bootstrap";

import axios from "axios";
import "./EditCar.css";
import CAR_MODELS from "../../resources/CAR_MODELS";

import CarPicture from "../carPage/CarPicture.js";

import firebase from "../../services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

import initialForm from "./initialForm";

const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();
const analytics = firebase.analytics();

const years = [];

for (let i = new Date().getFullYear() + 1; i > 1910; i--) {
  years.push(i);
}

const INSTAGRAM_TOKEN =
  "IGQVJWdU11dUVrc3M2V2ppTExoUmFjM09KUmhsazIzekNheTRhVFduV2lmaTlfcnppejgtZA2w0NnA2WDljWU1tSFdrNURQVExoZA1FUb0Y3TTBOUGhVUHV4ZAnFDU1A0dEUwNzBicWRQajhfNmg1OWpDdwZDZD";
const API_URL = "https://graph.instagram.com/me/media?fields=";
const API_FIELDS = "caption,media_url,media_type,permalink,timestamp,username";
const ALBUM_FIELDS = "media_url";

const options = {
  keys: ["caption"],
};

let instagramPosts = [];

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

function formReducer(prevState, { value, key }) {
  let updatedElement = { ...prevState[key] };
  updatedElement = value;
  return { ...prevState, [key]: updatedElement };
}

export default function EditCarForm({}) {
  const location = useLocation().pathname;
  const [user] = useAuthState(auth);

  let carRef = firestore.collection("cars");
  let docRef = null;

  let uid = "";

  if (location === "/editcar") {
    const urlParams = new URLSearchParams(window.location.search);
    uid = urlParams.get("id");
    docRef = firestore.doc(`cars/${uid}`);
    docRef.get().then((snapshot) => {
      if (auth.currentUser && snapshot.data().user !== auth.currentUser.uid) {
        console.error("Nonmatching user");
      }
    });
  } else if (location === "/newcar") {
    uid = new Date().getTime();
  }

  // const query = carRef.where("_id", "==", uid);
  const query = carRef.orderBy("make").limit(25);
  const [carData] = useCollectionData(query, { idField: "id" });

  const toastId = React.useRef(null);

  const [previewPic, setPreviewPic] = useState("");
  const [previewBlob, setPreviewBlob] = useState(null);
  const [models, setModels] = useState([]);
  const [preview, setPreview] = useState(false);

  const [form, dispatch] = useReducer(formReducer, initialForm);

  //Instagram import stuff
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [pictures, setPictures] = useState([]);
  const [search, setSearch] = useState("");
  const [openAlbums, setOpenAlbums] = useState([]);

  useEffect(() => {
    const url = API_URL + API_FIELDS + "&access_token=" + INSTAGRAM_TOKEN;
    const body = {};
    axios.get(url, body).then((res) => {
      instagramPosts = res.data.data;
      setPictures(instagramPosts);
    });
  }, []);

  const searchInstagramPosts = () => {
    const fuse = new Fuse(instagramPosts, options);
    setPictures(fuse.search(search).map((a) => a.item));
  };

  async function toggleAlbum(id) {
    const foundAlbum = openAlbums.find((e) => e.id === id);
    let albumContents = [];

    const url = `https://graph.instagram.com/${id}/children?fields=${ALBUM_FIELDS}&access_token=${INSTAGRAM_TOKEN}`;
    const body = {};
    await axios.get(url, body).then((res) => {
      albumContents = res.data.data;
    });

    if (foundAlbum === undefined) {
      const album = {
        id: id,
        contents: albumContents,
      };
      const newOpenAlbums = openAlbums.concat(album);
      setOpenAlbums(newOpenAlbums);
    } else {
      const newOpenAlbums = openAlbums.filter(function (e) {
        return e.id !== id;
      });
      setOpenAlbums(newOpenAlbums);
    }
  }

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  //Upload images stuff
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    setImages(imageList);
  };

  const onMakeChange = (make) => {
    const newModels = CAR_MODELS.find((e) => e.brand === make).models;
    dispatch({ value: make, key: "make" });
    setModels(newModels);
    dispatch({ value: newModels[0], key: "model" });
  };

  function generateDownload(previewCanvas, crop) {
    if (!crop || !previewCanvas) {
      return;
    }

    const canvas = getResizedCanvas(
      previewCanvas,
      crop.width * 2,
      crop.height * 2
    );

    canvas.toBlob(
      (blob) => {
        const previewUrl = URL.createObjectURL(blob);
        blob.lastModifiedDate = new Date();
        blob.name = "thumbnail.jpg";

        setPreviewBlob(blob);
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

  //Crop thumbnail
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
    const ctx = canvas.getContext("2d");

    canvas.width = crop.width * pixelRatio * 2;
    canvas.height = crop.height * pixelRatio * 2;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    ctx.scale(2, 2);
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

  function loadXHR(url) {
    return new Promise(function (resolve, reject) {
      try {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.responseType = "blob";
        xhr.onerror = function () {
          reject("Network error.");
        };
        xhr.onload = function () {
          if (xhr.status === 200) {
            resolve(xhr.response);
          } else {
            reject("Loading error:" + xhr.statusText);
          }
        };
        xhr.send();
      } catch (err) {
        reject(err.message);
      }
    });
  }

  const importInstagram = (media_url) => {
    loadXHR(media_url).then(function (blob) {
      setImages([
        ...images,
        {
          file: new File([blob], "test.jpg", { type: "image/jpg" }),
          data_url: media_url,
        },
      ]);
    });
  };

  const saveCar = async () => {
    let snapshotID = "";
    if (upImg === undefined) {
      toastId.current = toast("Save failed! Please add thumnbnail pic");
      return;
    }
    const carData = form;
    carData.user = auth.currentUser.uid;

    if (location === "/editcar") {
      snapshotID = uid;
      await docRef.set(carData);
    }
    else if (location === "/newcar") {
      await carRef.add(carData).then((snapshot) => {
        snapshotID = snapshot.id;
      });
    }

    var thumbnailRef = storage.ref(`${snapshotID}/thumbnail.jpg`);
    let p = new Promise((resolve) =>
      thumbnailRef.put(previewBlob).then(function (snapshot) {
        resolve();
      })
    );

    for (let i = 0, p = Promise.resolve(); i < images.length; i++) {
      var imageRef = storage.ref(`${snapshotID}/${new Date().getTime()}.jpg`);
      p = p.then(
        imageRef.put(images[i].file).then(function (snapshot) {
          console.log("Uploaded a blob or file!");
        })
      );
    }
    p.then((toastId.current = toast("Save success!")));
  };

  return (
    <div className="edit-car-container">
      <ToastContainer />

      <Button
        onClick={() => setPreview(!preview)}
        className="preview-btn btn-secondary"
      >
        {preview ? <>Edit</> : <>Preview</>}
      </Button>
      <Button onClick={saveCar} className="btn-success save-btn">
        <FontAwesomeIcon icon={faSave} /> Save
      </Button>
      {!preview ? (
        <div className="edit-car-form">
          <h1 className="edit-car-header">
            <FontAwesomeIcon icon={faCarAlt} /> EDIT CAR
          </h1>
          <div className="image-upload-container">
            <h2 className="edit-container-header">
              <FontAwesomeIcon icon={faCogs} /> Car Info
            </h2>
            <Form className="car-model-form">
              <Form.Row className="justify-content-md-center car-model">
                <Col sm={1}>
                  <Form.Control
                    size="lg"
                    as="select"
                    onChange={({ target: { value } }) =>
                      dispatch({ value, key: "year" })
                    }
                    placeholder="Model Year"
                    value={form.year}
                  >
                    <option value="" disabled selected>
                      Year
                    </option>
                    {years.map((modelYear) => (
                      <option>{modelYear}</option>
                    ))}
                  </Form.Control>
                </Col>
                <Col sm={2}>
                  <Form.Control
                    as="select"
                    size="lg"
                    onChange={(e) => {
                      onMakeChange(e.target.value);
                    }}
                    placeholder="Make"
                    value={form.make}
                  >
                    <option value="" disabled selected>
                      Make
                    </option>
                    {CAR_MODELS.map((model) => (
                      <option>{model.brand}</option>
                    ))}
                  </Form.Control>
                </Col>
                <Col sm={2}>
                  <Form.Control
                    as="select"
                    size="lg"
                    onChange={({ target: { value } }) =>
                      dispatch({ value, key: "model" })
                    }
                    placeholder="Model"
                    value={form.model}
                  >
                    <option value="" disabled selected>
                      Model
                    </option>
                    {models.map((model) => (
                      <option>{model}</option>
                    ))}
                  </Form.Control>
                </Col>
                <Col sm={1}>
                  <Form.Control
                    size="lg"
                    placeholder="Trim"
                    value={form.trim}
                    onChange={({ target: { value } }) =>
                      dispatch({ value, key: "trim" })
                    }
                  />
                </Col>
              </Form.Row>
              <Form.Row className="justify-content-md-center car-stat-row">
                <Col lg={2}>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text className="car-stat-prepend">
                        Power
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      placeholder="200"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                      onChange={({ target: { value } }) =>
                        dispatch({ value, key: "power" })
                      }
                    />
                    <InputGroup.Append>
                      <InputGroup.Text id="basic-addon2">HP</InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </Col>

                <Col lg={2}>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text className="car-stat-prepend">
                        Torque
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      placeholder="150"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                      onChange={({ target: { value } }) =>
                        dispatch({ value, key: "torque" })
                      }
                    />
                    <InputGroup.Append>
                      <InputGroup.Text id="basic-addon2">
                        FT/LBS
                      </InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </Col>
                <Col lg={2}>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text className="car-stat-prepend">
                        Curb Weight
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      placeholder="2500"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                      onChange={({ target: { value } }) =>
                        dispatch({ value, key: "weight" })
                      }
                    />
                    <InputGroup.Append>
                      <InputGroup.Text id="basic-addon2">LBS</InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </Col>
              </Form.Row>
              <Form.Row className="justify-content-md-center car-stat-row">
                <Col sm={2}>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text className="car-stat-prepend">
                        Engine Code
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      placeholder="4AGE"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                      onChange={({ target: { value } }) =>
                        dispatch({ value, key: "engine" })
                      }
                    />
                  </InputGroup>
                </Col>
                <Col sm={3}>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text className="car-stat-prepend">
                        Engine Displacement
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      placeholder="2"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                      onChange={({ target: { value } }) =>
                        dispatch({ value, key: "displacement" })
                      }
                    />
                    <InputGroup.Append>
                      <InputGroup.Text id="basic-addon2">L</InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </Col>
                <Col sm={3}>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text className="car-stat-prepend">
                        Drivetrain Layout
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      as="select"
                      onChange={({ target: { value } }) =>
                        dispatch({ value, key: "layout" })
                      }
                    >
                      <option>Front Engine RWD</option>
                      <option>Front Engine FWD</option>
                      <option>Mid Engine RWD</option>
                      <option>Rear Engine RWD</option>
                    </FormControl>
                  </InputGroup>
                </Col>
                <Col sm={2}>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text className="car-stat-prepend">
                        Chassis Code
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      placeholder="AE86"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                      onChange={({ target: { value } }) =>
                        dispatch({ value, key: "chassis" })
                      }
                    />
                  </InputGroup>
                </Col>
              </Form.Row>
              <Form.Row className="justify-content-md-center car-stat-row">
                <Col sm={6}>
                  <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      onChange={({ target: { value } }) =>
                        dispatch({ value, key: "description" })
                      }
                    />
                  </Form.Group>
                </Col>
              </Form.Row>
            </Form>
            <h2 className="edit-container-header">
              <FontAwesomeIcon icon={faThumbtack} /> Thumbnail
            </h2>
            <Row className="thumbnail-row">
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
                <canvas ref={previewCanvasRef} className="upload-preview" />
              </Col>
              <Col s="2" className="preview-container">
                <h3 className="preview-header">
                  <FontAwesomeIcon icon={faImage} /> THUMBNAIL PREVIEW
                </h3>
                <div className="car-card">
                  <div className="card-overlay">
                    <div className="card-like">
                      <i className="fas fa-heart"></i> 22
                    </div>
                    <div className="car-overlay-title">
                      <span className="car-year">{form.year}</span>
                      <br />
                      {`${form.make} ${form.model}`}
                    </div>
                    <span className="car-user">
                      <i className="fas fa-user"></i> SPEEDYSPEEDBOI
                    </span>
                  </div>
                  <div className="card-photo" style={background}></div>
                </div>
              </Col>
            </Row>
            <Row className="gallery-row">
              <h2 className="edit-container-header">
                <FontAwesomeIcon icon={faImages} /> Gallery
              </h2>
              <div className="gallery-container">
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
                      <div className="gallery-btn-container">
                        <Button
                          className="btn-secondary btn-upload"
                          onClick={onImageUpload}
                          {...dragProps}
                        >
                          <FontAwesomeIcon icon={faUpload} /> Upload Image
                        </Button>{" "}
                        <Button
                          onClick={handleShow}
                          className="btn-secondary btn-upload"
                        >
                          <FontAwesomeIcon icon={faInstagram} /> Import
                        </Button>
                      </div>
                      {imageList.map((image, index) => (
                        <div key={index} className="image-item">
                          <img src={image.data_url} alt="" width="300" />
                          <div className="image-item__btn-wrapper">
                            <Button
                              className="btn-danger"
                              onClick={() => onImageRemove(index)}
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </ImageUploading>
              </div>
            </Row>
          </div>
        </div>
      ) : (
        <div className="car-header" id="page">
          <div className="header-photo-container" style={styles}>
            <div className="car-header-overlay">
              <div className="car-header-year">{form.year}</div>
              <div className="car-header-model">{`${form.make} ${form.model}`}</div>
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
                  {form.year}
                  <br />
                  <strong>{form.make}</strong>
                  <br />
                  {form.model} {form.trim}
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

      <Modal
        show={show}
        onHide={handleClose}
        keyboard={false}
        dialogClassName="modal-90w"
      >
        <Modal.Body className="picture-modal">
          <div className="App">
            <p>Import photos to your vehicle from your Instagram posts</p>
            <div className="instagram-search">
              <InputGroup className="mb-3">
                <FormControl
                  onChange={handleSearchChange}
                  placeholder="Search for images"
                  aria-label="imagesearch"
                />
                <InputGroup.Append>
                  <Button
                    variant="outline-secondary"
                    onClick={searchInstagramPosts}
                  >
                    Search
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </div>
            <div>
              {pictures.map(function (element) {
                return (
                  <div className="insta-pic-container">
                    {element.media_type === "IMAGE" && (
                      <span>
                        <Button
                          onClick={() => importInstagram(element.media_url)}
                          className="add-btn btn-success"
                        >
                          Import
                        </Button>
                        <img
                          className="insta-pic"
                          src={element.media_url}
                        ></img>
                      </span>
                    )}
                    {element.media_type === "CAROUSEL_ALBUM" && (
                      <Button
                        className="album-btn"
                        onClick={() => {
                          toggleAlbum(element.id);
                        }}
                      >
                        <FontAwesomeIcon icon={faImages} />
                      </Button>
                    )}
                    {element.media_type === "CAROUSEL_ALBUM" &&
                      openAlbums.find((e) => e.id === element.id) ===
                        undefined && (
                        <div>
                          <img
                            className="insta-pic"
                            src={element.media_url}
                          ></img>
                        </div>
                      )}
                    {element.media_type === "CAROUSEL_ALBUM" &&
                      openAlbums.find((e) => e.id === element.id) !==
                        undefined && (
                        <div>
                          <div>
                            {openAlbums
                              .find((e) => e.id === element.id)
                              .contents.map(function (img) {
                                return (
                                  <div className="album-pic-container">
                                    <Button
                                      onClick={() =>
                                        importInstagram(img.media_url)
                                      }
                                      className="album-add-btn btn-success"
                                    >
                                      Import
                                    </Button>
                                    <img
                                      className="album-pic"
                                      src={img.media_url}
                                      width="200"
                                    ></img>
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      )}
                    <div>
                      <span>{element.caption}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="picture-modal">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
