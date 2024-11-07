import React from 'react';
import { motion } from 'framer-motion';

const Sparkle = ({ delay }) => {
    const randomPosition = () => ({
        x: Math.random() * 120 - 60, // -60 to +60 pixels
        y: Math.random() * 80 - 40,  // -40 to +40 pixels
    });

    const position = randomPosition();
    const duration = 4 + Math.random() * 4; // 4-8 seconds
    const scale = 0.5 + Math.random() * 0.6; // 50-110% size

    return (
        <motion.div
            style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: '8px',
                height: '8px',
            }}
            initial={{ 
                opacity: 0,
                scale: 0,
                x: position.x,
                y: position.y,
            }}
            animate={{
                opacity: [0, 1, 0],
                scale: [0, scale, 0],
                x: position.x,
                y: position.y,
            }}
            transition={{
                duration: duration,
                repeat: Infinity,
                delay: delay,
                ease: "easeInOut"
            }}
        >
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <path
                    d="M4 0L4.89806 2.76393H7.80423L5.45308 4.47214L6.35114 7.23607L4 5.52786L1.64886 7.23607L2.54692 4.47214L0.195774 2.76393H3.10194L4 0Z"
                    fill="white"
                />
            </svg>
        </motion.div>
    );
};

export default Sparkle; 