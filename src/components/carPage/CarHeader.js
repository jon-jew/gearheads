import React, { useRef, useState, useEffect } from "react";
import * as Scroll from "react-scroll";
import "./css/CarPage.css";
import CarPicture from "./CarPicture";
import Loading from "../Loading/Loading";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import firebase from "../../services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument, useCollection } from "react-firebase-hooks/firestore";

const auth = firebase.auth();

const storage = firebase.storage();
const firestore = firebase.firestore();

var Element = Scroll.Element;
var scroller = Scroll.scroller;
// var scroll = Scroll.animateScroll;

// const handleClick = () => {
//   scroller.scrollTo("car-footer", {
//     duration: 1500,
//     smooth: true,
//   });
// };

function CarHeader() {
  const [img, setImg] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [liked, setLiked] = useState(false);
  const [user] = useAuthState(auth);
  const [userId, setUserId] = useState("");

  const toastId = React.useRef(null);

  let carRef = firestore.collection("cars");
  let userRef = firestore.collection("users");

  const urlParams = new URLSearchParams(window.location.search);
  const uid = urlParams.get("id");
  const [value, loading, error] = useDocument(
    firebase.firestore().doc(`cars/${uid}`),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const [userValue, userLoading, userError] = useCollection(
    firestore.collection("users").where("user", "==", user ? user.uid : ""),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  useEffect(() => {
    if (!loading) getCarData();
    if (!userLoading) setUserId(userValue.docs[0].id);
  }, [loading, userLoading]);

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
    setLiked(user && value.data().likes.includes(auth.currentUser.uid));
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

  async function likeClick() {
    if (user) {
      if (value.data().likes.includes(auth.currentUser.uid)) {
        const removedLikes = value
          .data()
          .likes.filter((like) => like != auth.currentUser.uid);

        const userRemovedLikes = userValue.docs[0]
          .data()
          .likes.filter((like) => like != uid);

        await carRef.doc(uid).update({
          likes: removedLikes,
        });

        await userRef.doc(userId).update({
          likes: userRemovedLikes,
        });

        setLiked(false);
      } else {
        await carRef.doc(uid).update({
          likes: [...value.data().likes, auth.currentUser.uid],
        });

        await userRef.doc(userId).update({
          likes: [...userValue.docs[0].data().likes, uid],
        });
        setLiked(true);
      }
    } else {
      toastId.current = toast("Please login to like vehicles");
    }
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="car-header" id="page">
          <ToastContainer />
          {/* <div className="header-photo-container" style={styles}>
            <div className="car-header-overlay">
              <div className="car-header-year">{value.data().year}</div>
              <div className="car-header-model">
                {value.data().make} {value.data().model}
              </div>
              <Link to={`/garage?user=${value.data().user}`}>
                <div className="car-header-user">
                  <i className="fas fa-user"></i> Speedy Speed Boi
                </div>
              </Link>
              <br />
              <a className="down-button" onClick={handleClick}>
                <i className="fas fa-chevron-circle-down"></i>
              </a>
              <div className="chassis-code">EA11R</div>
            </div>
          </div> */}
          <Element name="car-footer" className="car-footer">
            <Row>
              <Col xs={4} ref={carfooter} className="left-footer" id="123">
                <div className="left-header">
                  <div className="like-button" onClick={likeClick}>
                    <i
                      className={liked ? "fas fa-heart" : "far fa-heart"}
                      style={liked ? { color: "#ba6666" } : { color: "#000" }}
                    ></i>{" "}
                    {value.data().likes.length}
                  </div>
                  <span className="footer-user">
                    <Link to={`/profile?user=${value.data().user}`}>
                      <i className="fas fa-user"></i> {value.data().username}'s
                    </Link>
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
