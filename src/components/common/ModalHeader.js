import React from 'react';

const ModalHeader = ({ title, onClose }) => {
    return (
        <div className="sticky top-0 bg-white z-10 border-b pb-2 mb-4 shadow-sm">
            <div className="flex justify-between items-center py-2">
                <h2 className="text-2xl font-bold">{title}</h2>
                <button 
                    onClick={onClose} 
                    className="text-gray-500 hover:text-red-500 flex items-center gap-1"
                >
                    Close <span className="text-xl">×</span>
                </button>
            </div>
        </div>
    );
};

export default ModalHeader; 