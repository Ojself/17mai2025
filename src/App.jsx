import React, { useState, useEffect } from 'react';
import './App.css';
import { FaMapMarkerAlt } from 'react-icons/fa';

import guleHusetImage from './assets/gulehuset_landscape.png';
import hostImage from './assets/frimodig.png';
import flaggImage from './assets/flagg.png';

import { useSearchParams } from 'react-router-dom';

import IcecreamLegend from './IcecreamLegend';

import big_deal_karamell from './assets/is/big_deal_karamell.png';
import big_deal_peanøtt from './assets/is/big_deal_peanøtt.png';
import creme_lakris from './assets/is/creme_lakris.png';
import creme_pos from './assets/is/creme_pos.png';
import daim from './assets/is/daim.png';
import dream_mango from './assets/is/dream_mango.png';
import friskis_fersken from './assets/is/friskis_fersken.png';
import friskis from './assets/is/friskis.png';
import gigant_original from './assets/is/gigant_original.png';
import kroneis_jordbær from './assets/is/kroneis_jordbær.png';
import kroneis_nonstop from './assets/is/kroneis_nonstop.png';
import kroneis_sjokolade from './assets/is/kroneis_sjokolade.png';
import melkesjokolade from './assets/is/melkesjokolade.png';
import nude_exotic from './assets/is/nude_exotic.png';
import nude_strawberry from './assets/is/nude_strawberry.png';
import royal_trippel_lakris from './assets/is/royal_trippel_lakris.png';
import royal_trippel_original from './assets/is/royal_trippel_original.png';
import sandwhich from './assets/is/sandwhich.png';
import snickers from './assets/is/snickers.png';
import solis from './assets/is/solis.png';

const images = [
  { source: big_deal_karamell, isPortrait: true, id: 'big_deal_karamell' },
  { source: big_deal_peanøtt, isPortrait: true, id: 'big_deal_peanøtt' },
  { source: dream_mango, isPortrait: true, id: 'dream_mango' },
  { source: daim, isPortrait: true, id: 'daim' },
  { source: kroneis_jordbær, isPortrait: true, id: 'kroneis_jordbær' },
  { source: kroneis_nonstop, isPortrait: true, id: 'kroneis_nonstop' },
  { source: solis, isPortrait: true, id: 'solis' },
  { source: kroneis_sjokolade, isPortrait: true, id: 'kroneis_sjokolade' },
  { source: nude_exotic, isPortrait: true, id: 'nude_exotic' },
  { source: nude_strawberry, isPortrait: true, id: 'nude_strawberry' },
  { source: creme_lakris, isPortrait: false, id: 'creme_lakris' },
  { source: creme_pos, isPortrait: false, id: 'creme_pos' },
  { source: friskis_fersken, isPortrait: false, id: 'friskis_fersken' },
  { source: friskis, isPortrait: false, id: 'friskis' },
  { source: gigant_original, isPortrait: false, id: 'gigant_original' },
  { source: melkesjokolade, isPortrait: false, id: 'melkesjokolade' },
  {
    source: royal_trippel_lakris,
    isPortrait: false,
    id: 'royal_trippel_lakris',
  },
  {
    source: royal_trippel_original,
    isPortrait: false,
    id: 'royal_trippel_original',
  },
  { source: sandwhich, isPortrait: false, id: 'sandwhich' },
  { source: snickers, isPortrait: false, id: 'snickers' },
];

const GOOGLE_HREF = 'https://maps.app.goo.gl/3sZv5LDSwMVTq5jXA';
function App() {
  const [hasPinged, setHasPinged] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (!hasPinged) {
      fetch('https://one7mayserver.onrender.com/ping', {
        method: 'GET',
      }).then((response) => {
        if (response.ok) {
          console.log('Pinged successfully');
        } else {
          console.error('Failed to ping');
        }
      });
      setHasPinged(true);
    }
  }, [hasPinged]);

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
      <div className="detailsAndIcecreamContainer">
        <div className="detailsContainer">
          <p className="">
            Kom og bli med på feiringen av 17. mai i Det Gule Huset! Vi åpner
            dørene kl. <span>{eventTime}</span> og holder åpent til sent. Så
            hvis du er i området og ønsker å ta turen innom for en øl, is eller
            pølse, er du hjertelig velkommen til Det Gule Huset!
          </p>
        </div>
        <div className="icecreamLegendContainer">
          <IcecreamLegend images={images} />
        </div>
      </div>
    </div>
  );
}

export default App;
