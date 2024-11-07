import React from 'react';
import { motion } from 'framer-motion';

const SplashScreen = ({ onComplete }) => {
    React.useEffect(() => {
        const timer = setTimeout(() => {
            onComplete();
        }, 8000);

        return () => clearTimeout(timer);
    }, [onComplete]);

    const integrationIcons = [
        { name: 'Google Sheets', icon: '📊' },
        { name: 'Microsoft Excel', icon: '📑' },
        { name: 'CSV Files', icon: '📝' },
        { name: 'JSON Data', icon: '🔄' },
        { name: 'SQL Databases', icon: '💾' },
        { name: 'API Endpoints', icon: '🔌' }
    ];

    return (
        <div className="fixed inset-0 bg-white flex flex-col justify-center items-center">
            <div className="md:grid md:grid-cols-2 lg:grid-cols-[60%_40%] w-full h-full">
                {/* Left Side */}
                <div className="relative hidden flex-1 flex-col justify-center px-5 pt-8 text-[#FE7600] md:flex md:px-6 md:py-[22px] lg:px-8 bg-[#FE7600]/10">
                    <motion.div 
                        className="flex flex-col text-[32px] leading-[1.2] md:text-[40px]"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 2.0 }}
                    >
                        <div className="-mt-4 flex w-full flex-col pr-5 md:pr-8 lg:pr-10">
                            <p className="font-bold">Filter and visualize</p>
                            <p className="font-normal">your data with ease</p>
                        </div>
                    </motion.div>

                    {/* Data Integration Section */}
                    <motion.div
                        className="mt-8 text-base"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 2.0, delay: 1.0 }}
                    >
                        <h3 className="text-xl font-semibold mb-4">Seamless Data Integration</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {integrationIcons.map((source, index) => (
                                <motion.div
                                    key={source.name}
                                    className="flex items-center gap-2 bg-white/10 rounded-lg p-3"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 1.4 + (index * 0.2) }}
                                >
                                    <span className="text-2xl">{source.icon}</span>
                                    <span className="text-sm font-medium">{source.name}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Right Side */}
                <div className="relative flex grow flex-col items-center justify-between bg-white px-5 py-8 text-black sm:rounded-t-[30px] md:rounded-none md:px-6">
                    <motion.div 
                        className="flex flex-col items-center justify-center h-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                    >
                        <h2 className="text-center text-[20px] leading-[1.2] md:text-[32px] md:leading-8 mb-4">
                            Welcome to OpenBooks
                        </h2>
                        <p className="text-gray-600 text-center max-w-md mb-6">
                            Connect and analyze data from multiple sources including Google Sheets, 
                            Microsoft Excel, and more. Transform your data into actionable insights.
                        </p>
                        <div className="mt-5 flex flex-col gap-4 items-center">
                            <motion.div
                                className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 4, repeat: 2, ease: "linear" }}
                            />
                            <motion.p 
                                className="text-gray-500"
                                animate={{ 
                                    opacity: [1, 0.5, 1],
                                    scale: [1, 1.02, 1]
                                }}
                                transition={{ 
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                Loading your experience...
                            </motion.p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default SplashScreen;