import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatButton = ({ onClick, isOpen }) => {
    return (
        <AnimatePresence>
            {!isOpen && (
                <motion.button
                    className="fixed bottom-8 right-8 w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-blue-500 hover:scale-110 transition-transform z-50"
                    onClick={onClick}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    whileHover={{ rotate: 15 }}
                >
                    <svg 
                        className="w-6 h-6 text-blue-500" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" 
                        />
                    </svg>
                </motion.button>
            )}
        </AnimatePresence>
    );
};

export default ChatButton; 