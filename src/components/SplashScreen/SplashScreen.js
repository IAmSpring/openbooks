import React from 'react';
import { motion } from 'framer-motion';

const SplashScreen = ({ onComplete }) => {
    React.useEffect(() => {
        const timer = setTimeout(() => {
            onComplete();
        }, 4000);

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className="fixed inset-0 bg-white flex flex-col justify-center items-center">
            <div className="md:grid md:grid-cols-2 lg:grid-cols-[60%_40%] w-full h-full">
                {/* Left Side - Added bg-[#FE7600] with 10% opacity */}
                <div className="relative hidden flex-1 flex-col justify-center px-5 pt-8 text-[#FE7600] md:flex md:px-6 md:py-[22px] lg:px-8 bg-[#FE7600]/10">
                    <motion.div 
                        className="flex flex-col text-[32px] leading-[1.2] md:text-[40px]"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.0 }}
                    >
                        <div className="-mt-4 flex w-full flex-col pr-5 md:pr-8 lg:pr-10">
                            <p className="font-bold">Filter and visualize</p>
                            <p className="font-normal">your data with ease</p>
                        </div>
                    </motion.div>
                </div>

                {/* Right Side */}
                <div className="relative flex grow flex-col items-center justify-between bg-white px-5 py-8 text-black sm:rounded-t-[30px] md:rounded-none md:px-6">
                    <motion.div 
                        className="flex flex-col items-center justify-center h-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        <h2 className="text-center text-[20px] leading-[1.2] md:text-[32px] md:leading-8 mb-4">
                            Welcome to OpenBooks
                        </h2>
                        <div className="mt-5 flex flex-col gap-4 items-center">
                            <motion.div
                                className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            />
                            <p className="text-gray-500">Loading your experience...</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default SplashScreen;