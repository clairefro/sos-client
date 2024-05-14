import { useState } from "react";

const Modal = ({ isOpen, onClose, children }) => {
  const [isVisible, setIsVisible] = useState(isOpen);

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };

  const handleOverlayClick = (event) => {
    // Check if the click target is the overlay itself (not its children)
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };

  return (
    <>
      {isVisible && (
        <div className="modal-overlay" onClick={handleOverlayClick}>
          <div className="modal">
            <button className="modal-close-btn" onClick={handleClose}>
              Close
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
