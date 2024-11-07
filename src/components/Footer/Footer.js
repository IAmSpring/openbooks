import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-blue-500 text-white py-6 mt-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">OpenBooks</h3>
                        <p className="text-sm">
                            A modern data filtering and visualization platform built with React.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <li><a href="#" className="hover:text-blue-200">Documentation</a></li>
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <li><a href="#" className="hover:text-blue-200">API Reference</a></li>
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <li><a href="#" className="hover:text-blue-200">Support</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Connect</h3>
                        <ul className="space-y-2">
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <li><a href="#" className="hover:text-blue-200">GitHub</a></li>
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <li><a href="#" className="hover:text-blue-200">Twitter</a></li>
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <li><a href="#" className="hover:text-blue-200">LinkedIn</a></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 pt-4 border-t border-blue-400 text-center">
                    <p className="text-sm">
                        © {new Date().getFullYear()} OpenBooks. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 