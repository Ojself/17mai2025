import React from 'react';
import './App.css';
import { FaMapMarkerAlt } from 'react-icons/fa';

import guleHusetImage from './assets/gulehuset_landscape.png';
import hostImage from './assets/frimodig.png';

function App() {
  const GOOGLE_HREF = 'https://maps.app.goo.gl/3sZv5LDSwMVTq5jXA';

  const handleHostClick = () => {
    /* make the image jiggle for a couple of seconds */
    const hostImageElement = document.querySelector('.imgHost');
    hostImageElement.classList.add('jiggle');
    setTimeout(() => {
      hostImageElement.classList.remove('jiggle');
    }, 2000);
  };

  return (
    <div className="appContainer">
      {/* Hero Section */}
      <div className="imageContainer">
        <img className="imgHero" src={guleHusetImage} alt="Det Gule Huset" />;
      </div>
      <img
        onClick={handleHostClick}
        className="imgHost"
        src={hostImage}
        alt="Vertskapet"
      />
      {/* Title and Description */}
      <div className="titleContainer">
        <h1 className="title">17. mai-fest i Det Gule Huset</h1>
        <a
          href={GOOGLE_HREF}
          rel="noopener noreferrer"
          target="_blank"
          className="address"
        >
          <FaMapMarkerAlt />
          Dops Gate 12
        </a>
      </div>
      <div className="detailsAndMapContainer">
        <div className="detailsContainer">
          <p className="">
            Kom og bli med på feiringen av 17. mai i Det Gule Huset! Vi åpner
            dørene kl. 14:00 og holder åpent til sent. Så hvis du er i området
            og ønsker å feire nasjonaldagen med oss, er du hjertelig velkommen
            til Det Gule huset!
          </p>
        </div>
        <div className="mapContainer">
          <iframe
            className="map"
            src="https://www.openstreetmap.org/export/embed.html?bbox=10.746364295482637%2C59.919230131826765%2C10.74881047010422%2C59.920308305237434&amp;layer=transportmap&amp;marker=59.91976922291057%2C10.747587382793427"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default App;
