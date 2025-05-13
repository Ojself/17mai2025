import React, { useState, useEffect } from 'react';
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

import './App.css';
const IcecreamLegend = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIceCream, setSelectedIceCream] = useState(null);
  const [previousChoice, setPreviousChoice] = useState(null);

  useEffect(() => {
    const savedChoice = localStorage.getItem('selectedIceCream');
    if (savedChoice) {
      setSelectedIceCream(savedChoice);
      setPreviousChoice(savedChoice);
    }
  }, []);
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen]);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => {
    setSelectedIceCream(previousChoice); // Revert to saved choice on close
    setIsModalOpen(false);
  };

  const selectIceCream = (id) => setSelectedIceCream(id);

  const sendChoice = () => {
    if (selectedIceCream) {
      localStorage.setItem('selectedIceCream', selectedIceCream);
      setPreviousChoice(selectedIceCream);

      const payload = {
        userId: localStorage.getItem('userId'),
        choice: selectedIceCream,
      };

      const requestMethod = previousChoice ? 'PATCH' : 'POST';

      fetch('https://one7mayserver.onrender.com/save-choice', {
        method: requestMethod,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
        .then((result) => {
          if (!result.ok) {
            throw new Error('Network response was not ok');
          }
          return result.json();
        })
        .then((json) => {
          localStorage.setItem('userId', json.userId);
          closeModal();
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  };
  const previewImage = images.find((image) => image.id === selectedIceCream);
  const previewImageSrc = previewImage ? previewImage.source : images[0].source;

  const previewText = selectedIceCream ? 'Din favoritt' : `Velg is!`;

  return (
    <div className="icecream-legend-container">
      <div>
        <h2>{previewText}</h2>
        <img
          src={previewImageSrc}
          alt="Ice Cream Legend Preview"
          className="icecream-legend-preview"
          onClick={openModal}
        />
      </div>

      {isModalOpen && (
        <div className="icecream-legend-modal">
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ textAlign: 'center', fontSize: '1.25em' }}>
              <h2>Velg din favoritt!</h2>
            </div>
            <div className="legend-images">
              {images.map((image) => (
                <div
                  key={image.id}
                  className={`legend-image-wrapper`}
                  onClick={() => selectIceCream(image.id)}
                >
                  <img
                    src={image.source}
                    alt={image.id}
                    className={`legend-image ${
                      selectedIceCream === image.id ? 'selected' : ''
                    }`}
                  />
                </div>
              ))}
            </div>
            <div style={{ width: '100%', textAlign: 'center' }}>
              <button className="close-button" onClick={closeModal}>
                Lukk
              </button>
              <button
                disabled={!selectedIceCream} // Disable if no ice cream is selected
                className="send-button"
                onClick={sendChoice}
              >
                Velg!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default IcecreamLegend;
