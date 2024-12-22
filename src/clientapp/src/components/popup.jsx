import React from 'react';
import './popup.css';

function Popup({ message, onClose }) {
    return (
        <div className="popup-overlay">
            <div className="popup-box">
                <p>{message}</p>
                <button onClick={onClose}>OK</button>
            </div>
        </div>
    );
}

export default Popup;
