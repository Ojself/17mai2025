import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import iceCreamLegend from './assets/legend.png';

import './App.css';
const IcecreamLegend = ({ images }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIceCream, setSelectedIceCream] = useState(null);
  const [previousChoice, setPreviousChoice] = useState(null);

  useEffect(() => {
    const savedChoice = localStorage.getItem('selectedIceCream');
    if (savedChoice) {
      console.log('saved choice', savedChoice);
      setSelectedIceCream(savedChoice);
      setPreviousChoice(savedChoice);
    }
  }, []);
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isModalOpen) {
        setSelectedIceCream(previousChoice);
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
    setIsModalOpen(false);
  };

  const selectIceCream = (id) => {
    setSelectedIceCream(id);
  };

  const sendChoice = () => {
    if (selectedIceCream) {
      localStorage.setItem('selectedIceCream', selectedIceCream);
      setPreviousChoice(selectedIceCream);

      const userId = localStorage.getItem('userId');
      const payload = {
        userId,
        choice: selectedIceCream,
      };

      const requestMethod = previousChoice && userId ? 'PATCH' : 'POST';

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
          closeModal(selectedIceCream);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  };
  const previewImage = images.find((image) => image.id === selectedIceCream);
  const previewImageSrc = previewImage ? previewImage.source : iceCreamLegend;

  const previewText = selectedIceCream ? 'Din favoritt' : `Velg en favoritt!`;

  return (
    <div className="icecream-legend-container">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h2>{previewText}</h2>
        <img
          src={previewImageSrc}
          alt="Ice Cream Legend Preview"
          className="icecream-legend-preview"
          onClick={openModal}
        />
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="icecream-legend-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
            >
              <h2 style={{ textAlign: 'center' }}>Velg din favoritt!</h2>
              <div className="legend-images">
                {images.map((image) => (
                  <motion.div
                    key={image.id}
                    className="legend-image-wrapper"
                    onClick={() => selectIceCream(image.id)}
                  >
                    <img
                      loading="lazy"
                      src={image.source}
                      alt={image.id}
                      className={`legend-image${
                        selectedIceCream === image.id ? '-selected' : ''
                      }`}
                    />
                  </motion.div>
                ))}
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  zIndex: 100,
                }}
              >
                <button
                  className="close-button"
                  onClick={() => {
                    setSelectedIceCream(previousChoice);
                    closeModal();
                  }}
                >
                  Lukk
                </button>
                <button
                  disabled={!selectedIceCream}
                  className="send-button"
                  onClick={sendChoice}
                >
                  Velg!
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default IcecreamLegend;
