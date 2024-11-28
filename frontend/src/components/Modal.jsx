import React from "react";

function Modal({ isVisible, onClose, children }) {
    return (
        isVisible && (
            <div className="modal-overlay" onClick={onClose}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    {children}
                    <button className="close-modal" onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        )
    );
}

export default Modal;