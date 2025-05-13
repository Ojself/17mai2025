import React, { useState, useEffect } from 'react';

import './App.css';
const IcecreamLegend = ({ images }) => {
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
