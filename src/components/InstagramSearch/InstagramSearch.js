import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar.js";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import Fuse from "fuse.js";

import "../../css/App.css";

import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages } from "@fortawesome/free-regular-svg-icons";

import "./InstagramSearch.css";

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
  const [openAlbums, setOpenAlbums] = useState([]);

  useEffect(() => {
    const url = API_URL + API_FIELDS + "&access_token=" + INSTAGRAM_TOKEN;
    const body = {};
    axios.get(url, body).then((res) => {
      instagramPosts = res.data.data;
      console.log(res.data.data);
      setPictures(instagramPosts);
    });
  }, []);

  const searchInstagramPosts = () => {
    const fuse = new Fuse(instagramPosts, options);
    setPictures(fuse.search(search).map((a) => a.item));
  };

  async function toggleAlbum(id) {
    const foundAlbum = openAlbums.find((e) => e.id == id);
    let albumContents = [];

    const url = `https://graph.instagram.com/${id}/children?fields=${ALBUM_FIELDS}&access_token=${INSTAGRAM_TOKEN}`;
    const body = {};
    await axios.get(url, body).then((res) => {
      albumContents = res.data.data;
    });

    if (foundAlbum == undefined) {
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
            {pictures.map(function (element) {
              return (
                <div className="insta-pic-container">
                  {element.media_type === "IMAGE" && (
                    <img className="insta-pic" src={element.media_url}></img>
                  )}
                  {element.media_type === "CAROUSEL_ALBUM" &&
                    openAlbums.find((e) => e.id == element.id) == undefined && (
                      <div>
                        <img
                          className="insta-pic"
                          src={element.media_url}
                        ></img>
                      </div>
                    )}
                  {element.media_type === "CAROUSEL_ALBUM" &&
                    openAlbums.find((e) => e.id == element.id) !==
                      undefined && (
                      <div>
                        <div>
                          {openAlbums
                            .find((e) => e.id == element.id)
                            .contents.map(function (img) {
                              return (
                                <img
                                  className="album-pic"
                                  src={img.media_url}
                                  width="200"
                                ></img>
                              );
                            })}
                        </div>
                      </div>
                    )}
                  <div>
                    <span>{element.caption}</span>
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
                  </div>
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
