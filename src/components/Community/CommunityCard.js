import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./Community.css";

import firebase from "../../services/firebase";
import compic from "../../honda_beat_community.png";
import miatapic from "../../mazda_miata_community.png";
const storage = firebase.storage();

function CommunityCard({ pic, make, model, years, chassis }) {
 const [isHover, setHover] = useState(false)
  const cardEnter = () => {
    setHover(true);
  };
  const cardExit = () => {
    setHover(false);
  };

  return (
    <Link
      onMouseEnter={cardEnter}
      onMouseLeave={cardExit}
      to={`/communitypage?make=${make}&model=${model}&chassis=${chassis}`}
      className="community-card"
    >
      <img src={pic} className={`community-card-pic ${isHover ? 'cc-hover': ''}`} />
      <div className="community-card-title">
        <div className="community-card-detail cc-year">{years}</div>
        <div className="community-card-detail cc-type">{make}</div>
        <div className="community-card-detail cc-type">{model}</div>
        <div className="community-card-detail cc-chassis">{chassis}</div>
        <div className="cc-count">20</div>
      </div>
    </Link>
  );
}

export default CommunityCard;
