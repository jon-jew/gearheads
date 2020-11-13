import React, { useState, useEffect } from "react";
import NavbarHome from "../components/NavbarHome.js";
import Sidebar from "../components/Sidebar.js";
import CarCardContainer from "../components/CarCardContainer.js";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import Fuse from "fuse.js";

import "../css/UserProfile.css";

import axios from "axios";

const INSTAGRAM_TOKEN =
  "IGQVJWdU11dUVrc3M2V2ppTExoUmFjM09KUmhsazIzekNheTRhVFduV2lmaTlfcnppejgtZA2w0NnA2WDljWU1tSFdrNURQVExoZA1FUb0Y3TTBOUGhVUHV4ZAnFDU1A0dEUwNzBicWRQajhfNmg1OWpDdwZDZD";
const API_URL = "https://graph.instagram.com/me/media?fields=";
const API_FIELDS = "caption,media_url,media_type,permalink,timestamp,username";
const ALBUM_FIELDS = "media_url";

const options = {
  keys: ["caption"],
};

let instagramPosts = [];

function UserProfile() {
  const [pictures, setPictures] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const url = API_URL + API_FIELDS + "&access_token=" + INSTAGRAM_TOKEN;
    const body = {};
    axios.get(url, body).then((res) => {
      instagramPosts = res.data.data;
      console.log(res.data.data);
      setPictures(instagramPosts);
    });
  }, []);

  const url2 = "https://graph.instagram.com/18142765852101963/children?fields=" + ALBUM_FIELDS + "&access_token=" + INSTAGRAM_TOKEN;
  const body = {};
  axios.get(url2, body).then((res) => {
    console.log(res.data.data);
  });

  const searchInstagramPosts = () => {
      const fuse = new Fuse(instagramPosts, options);

    //   if (search !== '') {
    //     setPictures(instagramPosts.filter((s) => s.caption === search));
    //   } else {
    //       setPictures(instagramPosts);
    //   }

      setPictures(fuse.search(search).map(a => a.item));
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="App">
      <div id="outer-container">
        <Sidebar />
        <main id="page-wrap">
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
          <div>
            {pictures.map(function (e) {
              return (
                <div className="insta-pic-container">
                  <img className="insta-pic" src={e.media_url}></img>
                  <p>{e.caption}</p>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}

export default UserProfile;
