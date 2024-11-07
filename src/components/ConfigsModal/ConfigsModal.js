import React from 'react';
import ModalHeader from '../common/ModalHeader';
import ModalContainer from '../common/ModalContainer';

const ConfigsModal = ({ configs, onClose, onLoadConfig, onDeleteConfig, onClearConfigs }) => {
    if (!configs.length) return null;

    const colorScheme = {
        Invoice: 'text-red-500',
        Customer: 'text-green-500',
        Amount: 'text-blue-500',
        Date: 'text-purple-500',
    };

    return (
        <ModalContainer onClose={onClose}>
            <ModalHeader title="Saved Configurations" onClose={onClose} />
            <div className="sticky top-0 bg-white z-10 px-6 py-4 border-b">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg text-gray-600">{configs.length} saved configurations</h3>
                    <button
                        onClick={onClearConfigs}
                        className="p-2 text-red-500 hover:text-red-700 flex items-center gap-2"
                    >
                        <span>🗑️</span> Clear All
                    </button>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto min-h-0 px-6 py-4">
                <ul className="space-y-6">
                    {configs.map((config, index) => (
                        <li key={index} className="border-b pb-6 last:border-b-0">
                            <div className="flex justify-between items-center">
                                <button
                                    onClick={() => onLoadConfig(config)}
                                    className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2"
                                >
                                    <span className="transform rotate-90">↑</span>
                                    Load Config from {new Date(config.timestamp).toLocaleString()}
                                </button>
                                <div className="flex gap-2">
                                    <button onClick={() => onDeleteConfig(index)} className="text-red-500 hover:text-red-700">Delete</button>
                                </div>
                            </div>
                            {config.sqlSchema && (
                                <pre
                                    className="bg-gray-100 p-2 rounded whitespace-pre-wrap mt-2"
                                    dangerouslySetInnerHTML={{
                                        __html: config.sqlSchema.replace(/Invoice|Customer|Amount|Date/g, (match) => {
                                            return `<span class="${colorScheme[match]}">${match}</span>`;
                                        }),
                                    }}
                                ></pre>
                            )}
                            <div className="mt-4 bg-gray-50 p-4 rounded border">
                                <h3 className="text-lg font-semibold">Summary</h3>
                                <p><strong>Total Transactions:</strong> {config.totalCount}</p>
                                <p><strong>Occupations:</strong> {config.selectedOccupations.join(', ')}</p>
                                <p><strong>Age Range:</strong> {config.ageFilter[0]} - {config.ageFilter[1]}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </ModalContainer>
    );
};

export default ConfigsModal; 