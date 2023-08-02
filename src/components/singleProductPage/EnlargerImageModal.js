import './EnlargedImageModal.css';
import React from 'react';
import { useState } from 'react';
import { Spinner } from 'react-bootstrap';

const EnlargedImageModal = ({ imageUrl, onClose }) => {
    const [isLoading, setIsLoading] = useState(true);
    const handleImageLoad = () => {
        setIsLoading(false);
      };
  const handleOverlayClick = (event) => {
    // Close the modal if the overlay (background) is clicked
    if (event.target.classList.contains('modal-overlay')) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="image-modal">
        <div className="image-modal-content">
        {isLoading ? (
            // Display the spinner while the image is loading
            <Spinner animation="border"/>
          ) : null}
          <img
            src={imageUrl}
            alt="Enlarged Image"
            onLoad={handleImageLoad}
            style={isLoading ? { display: 'none' } : { display: 'block' }}
          />
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default EnlargedImageModal;