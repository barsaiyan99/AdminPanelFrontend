import React from 'react';

const InvoicePopup = ({ isOpen, onConfirm, onCancel, message }) => {
    if (!isOpen) return null;

    const handleOverlayClick = (event) => {
        if (event.target === event.currentTarget) {
            onCancel();
        }
    };

    return (
        <div 
            className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50" 
            onClick={handleOverlayClick}
            role="dialog"
            aria-labelledby="popup-message"
            aria-modal="true"
        >
            <div className="bg-white p-6 rounded-lg shadow-lg w-80" role="document">
                <p id="popup-message" className="text-lg mb-4">{message}</p>
                <div className="flex justify-end space-x-4">
                    <button 
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={onConfirm}
                        aria-label="Confirm"
                    >
                        Confirm
                    </button>
                    <button 
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={onCancel}
                        aria-label="Cancel"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InvoicePopup;
