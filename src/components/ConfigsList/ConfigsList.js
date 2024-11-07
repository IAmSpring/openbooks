import React, { useState, useEffect } from 'react';

const ConfigsList = ({ onLoadConfig }) => {
    const [configs, setConfigs] = useState([]);

    useEffect(() => {
        const savedConfigs = JSON.parse(localStorage.getItem('configs')) || [];
        setConfigs(savedConfigs);
    }, []);

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 m-4 border border-gray-200">
            <h2 className="text-2xl font-bold mb-4 border-b pb-2">Saved Configurations</h2>
            {configs.length === 0 ? (
                <p className="text-gray-500">No saved configurations.</p>
            ) : (
                <ul>
                    {configs.map((config, index) => (
                        <li key={index} className="mb-2">
                            <button
                                onClick={() => onLoadConfig(config)}
                                className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Load Config from {new Date(config.timestamp).toLocaleString()}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ConfigsList; 