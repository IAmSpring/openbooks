import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CookieConsent = () => {
    const [showBanner, setShowBanner] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            setShowBanner(true);
        }
    }, []);

    const handleConsent = (type) => {
        const consentData = {
            type,
            timestamp: new Date().toISOString(),
            analytics: type === 'all' || type === 'custom',
            marketing: type === 'all',
            necessary: true,
            preferences: type === 'all' || type === 'custom'
        };
        
        localStorage.setItem('cookieConsent', JSON.stringify(consentData));
        setShowBanner(false);
        setShowModal(false);
    };

    const CookieModal = () => (
        <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div 
                className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
            >
                <h2 className="text-2xl font-bold mb-4">Cookie Preferences</h2>
                <div className="space-y-4">
                    <div className="p-4 border rounded">
                        <div className="flex justify-between items-center">
                            <h3 className="font-semibold">Necessary Cookies</h3>
                            <span className="text-gray-500">Always Active</span>
                        </div>
                        <p className="text-gray-600 text-sm mt-2">
                            These cookies are essential for the website to function properly.
                        </p>
                    </div>
                    <div className="p-4 border rounded">
                        <div className="flex justify-between items-center">
                            <h3 className="font-semibold">Analytics Cookies</h3>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    className="sr-only peer" 
                                    defaultChecked 
                                    id="analytics-checkbox"
                                    aria-label="Analytics cookies toggle"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                        <p className="text-gray-600 text-sm mt-2">
                            Help us understand how visitors interact with our website.
                        </p>
                    </div>
                    <div className="p-4 border rounded">
                        <div className="flex justify-between items-center">
                            <h3 className="font-semibold">Marketing Cookies</h3>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    className="sr-only peer" 
                                    id="marketing-checkbox"
                                    aria-label="Marketing cookies toggle"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                        <p className="text-gray-600 text-sm mt-2">
                            Used to track visitors across websites for marketing purposes.
                        </p>
                    </div>
                </div>
                <div className="mt-6 flex justify-end gap-2">
                    <button 
                        onClick={() => handleConsent('custom')}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Save Preferences
                    </button>
                    <button 
                        onClick={() => setShowModal(false)}
                        className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );

    return (
        <AnimatePresence>
            {showBanner && (
                <motion.div 
                    className="fixed bottom-4 left-4 w-1/2 bg-white rounded-lg shadow-lg z-50 overflow-hidden"
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                >
                    <div className="p-6">
                        <h3 className="text-lg font-semibold mb-2">Cookie Settings</h3>
                        <p className="text-gray-600 mb-4">
                            We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <button 
                                onClick={() => handleConsent('all')}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Accept All
                            </button>
                            <button 
                                onClick={() => handleConsent('required')}
                                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                            >
                                Accept Required
                            </button>
                            <button 
                                onClick={() => handleConsent('none')}
                                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                            >
                                Reject All
                            </button>
                            <button 
                                onClick={() => setShowModal(true)}
                                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                            >
                                Custom
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
            {showModal && <CookieModal />}
        </AnimatePresence>
    );
};

export default CookieConsent; 