import React, { useRef, useState, useEffect } from "react";
import * as Scroll from "react-scroll";
import "./css/CarPage.css";
import CarPicture from "./CarPicture";
import { Row, Col } from "react-bootstrap";

import firebase from "../../services/firebase";
import { useDocument } from "react-firebase-hooks/firestore";

const storage = firebase.storage();
const firestore = firebase.firestore();

var Element = Scroll.Element;
var scroller = Scroll.scroller;
// var scroll = Scroll.animateScroll;

const handleClick = () => {
  scroller.scrollTo("car-footer", {
    duration: 1500,
    smooth: true,
  });
};

function CarHeader() {
  const [img, setImg] = useState(null);
  const [gallery, setGallery] = useState([]);
  const urlParams = new URLSearchParams(window.location.search);
  const uid = urlParams.get("id");
  const [value, loading, error] = useDocument(
    firebase.firestore().doc(`cars/${uid}`),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  useEffect(() => {
    if (!loading) getCarData();
  }, [loading]);

  const getCarData = async () => {
    await storage
      .ref(`${uid}/thumbnail.jpg`)
      .getDownloadURL()
      .then(function (url) {
        var xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = function (event) {
          var blob = xhr.response;
        };
        xhr.open("GET", url);
        xhr.send();
        setImg(url);
      })
      .catch(function (error) {
        // Handle any errors
      });

    const initImages = [];

    await Promise.all(
      value.data().images.map(async (img) => {
        await storage
          .ref(`${uid}/${img}`)
          .getDownloadURL()
          .then(async function (url) {
            var xhr = new XMLHttpRequest();
            var blob = null;
            xhr.responseType = "blob";
            xhr.onload = function (event) {
              blob = xhr.response;
            };
            xhr.open("GET", url);
            xhr.send();
            initImages.push({
              file: new File([blob], img, { type: "image/jpg" }),
              data_url: url,
            });
            Promise.resolve();
          })
          .catch(function (error) {
            // Handle any errors
          });
      })
    );
    setGallery(initImages);
  };

  var styles = {
    backgroundAttachment: "fixed",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundImage: `url(${img})`,
  };
  const carfooter = useRef(null);

  const [like, setLike] = useState(false);
  const [hover, setHover] = useState(false);

  function likeClick() {
    setLike(!like);
  }

  function likeHover() {
    setHover(!hover);
  }

  return (
    <>
      {loading ? (
        <div>loading...</div>
      ) : (
        <div className="car-header" id="page">
          <div className="header-photo-container" style={styles}>
            <div className="car-header-overlay">
              <div className="car-header-year">{value.data().year}</div>
              <div className="car-header-model">
                {value.data().make} {value.data().model}
              </div>
              <div className="car-header-user">
                <i className="fas fa-user"></i> Speedy Speed Boi
              </div>
              <br />
              <a className="down-button" onClick={handleClick}>
                <i className="fas fa-chevron-circle-down"></i>
              </a>
              {/* <div className="chassis-code">EA11R</div> */}
            </div>
          </div>
          <Element name="car-footer" className="car-footer">
            <Row>
              <Col xs={4} ref={carfooter} className="left-footer" id="123">
                <div className="left-header">
                  {like || hover ? (
                    <div
                      className="like-button"
                      onMouseEnter={likeHover}
                      onMouseLeave={likeHover}
                      onClick={likeClick}
                    >
                      <i className="fas fa-heart heart-color"></i> 1224
                    </div>
                  ) : (
                    <div
                      className="like-button"
                      onMouseEnter={likeHover}
                      onMouseLeave={likeHover}
                      onClick={likeClick}
                    >
                      <i className="fas fa-heart"></i> 1223
                    </div>
                  )}
                  <span className="footer-user">
                    <i className="fas fa-user"></i> Speedy Speed Boi's
                    <br />
                  </span>
                  {value.data().year}
                  <br />
                  <strong>{value.data().make}</strong>
                  <br />
                  {value.data().model} {value.data().trim}
                </div>
                <Row className="car-stats-row">
                  <Col>
                    <span className="car-card-stat">Power</span>
                    <br />
                    {value.data().power} HP
                  </Col>
                  <Col>
                    <span className="car-card-stat">Torque</span>
                    <br />
                    {value.data().torque} FT/LB
                  </Col>
                  <Col>
                    <span className="car-card-stat">Weight</span>
                    <br />
                    {value.data().weight} LBS
                  </Col>
                </Row>
                <Row className="car-stats-row footer-row">
                  <Col>
                    <span className="car-card-stat">Engine</span>
                    <br />
                    {value.data().displacement} L {value.data().engine}
                  </Col>
                  <Col>
                    <span className="car-card-stat">Layout</span>
                    <br />
                    {value.data().layout}
                  </Col>
                  <Col>
                    <span className="car-card-stat">Chassis</span>
                    <br />
                    {value.data().chassis}
                  </Col>
                </Row>
                <div className="car-description">
                  {value.data().description}
                </div>
              </Col>
              <Col xs={8} className="right-footer">
                {/* <div className="timeline-header">
              <strong>
                <i className="far fa-calendar"></i>
              </strong>{" "}
              | <i className="fas fa-thumbtack"></i>
            </div> */}
                <div className="pic-container">
                  {/* <div className="month">
                <div className="timeline">MAR 2020</div>
                <div className="picture-container"></div>
                <br />
              </div>
              <div className="month">
                <div className="timeline">MAR 2020</div>
                <div className="picture-container"></div>
                <br />
              </div> */}
                  {gallery.map((image, index) => (
                    <CarPicture key={index} pic={image.data_url} />
                  ))}
                </div>
              </Col>
            </Row>
          </Element>
        </div>
      )}
    </>
  );
}

export default CarHeader;
