import React from 'react';
import NavbarHome from '../components/NavbarHome.js';
import Sidebar from '../components/Sidebar.js';
import CarCardContainer from '../components/CarCardContainer.js';

import '../css/App.css';

import axios from 'axios';

const INSTAGRAM_TOKEN = 'IGQVJWdU11dUVrc3M2V2ppTExoUmFjM09KUmhsazIzekNheTRhVFduV2lmaTlfcnppejgtZA2w0NnA2WDljWU1tSFdrNURQVExoZA1FUb0Y3TTBOUGhVUHV4ZAnFDU1A0dEUwNzBicWRQajhfNmg1OWpDdwZDZD';
const API_URL = "https://graph.instagram.com/me/media?fields=";
const API_FIELDS = "caption,media_url,media_type,permalink,timestamp,username";



function Home() {
  return(
    <div className = "App">
      <div id="outer-container">
        <Sidebar />
        <NavbarHome />
        <main id="page-wrap">

          <div class = "welcome">
            Welcome to Gearheads!
            Use this to explore other people's cars.
          </div>

          <CarCardContainer />
        </main>
      </div>
    </div>

  );
}

export default Home;
