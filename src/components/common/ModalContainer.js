import React from 'react';
import { motion } from 'framer-motion';

const ModalContainer = ({ children, onClose }) => {
    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center p-4 sm:p-6 md:p-8">
            <motion.div 
                className="bg-white rounded-xl w-4/5 max-w-2xl h-3/4 shadow-lg flex flex-col overflow-hidden m-auto p-2 sm:p-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
            >
                {children}
            </motion.div>
        </div>
    );
};

export default ModalContainer; 