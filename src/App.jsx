import React from 'react';
import './App.css';
import { FaMapMarkerAlt } from 'react-icons/fa';

import guleHusetImage from './assets/gulehuset_landscape.png';
import hostImage from './assets/frimodig.png';
import flaggImage from './assets/flagg.png';

import { useSearchParams } from 'react-router-dom';

function App() {
  const GOOGLE_HREF = 'https://maps.app.goo.gl/3sZv5LDSwMVTq5jXA';

  const [searchParams] = useSearchParams();

  // Determine time based on query params
  const hasChildren = searchParams.get('barn') === 'true';
  const eventTime = hasChildren ? '14:00' : '16:00';

  const handleHostClick = () => {
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
        <img
          onClick={handleHostClick}
          className="imgHost"
          src={hostImage}
          alt="Vertskapet"
        />
      </div>
      {/* Title and Description */}
      <div className="titleContainer">
        <div className="titleAndImage">
          <h1 className="title">17. mai-feiring i Det Gule Huset</h1>
          <img className="imgFlagg" src={flaggImage} alt="Norgesflagg" />
        </div>

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
            dørene kl. <span>{eventTime}</span> og holder åpent til sent. Så
            hvis du er i området og ønsker å ta turen innom, er du hjertelig
            velkommen til Det Gule Huset!
          </p>
        </div>
        <div className="mapContainer">
          <iframe
            className="map"
            src="https://www.openstreetmap.org/export/embed.html?bbox=10.746364295482637%2C59.919230131826765%2C10.74881047010422%2C59.920308305237434&amp;layer=mapnik&amp;marker=59.91976922291057%2C10.747587382793427"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default App;
