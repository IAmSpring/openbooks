import React from 'react';
import { toast } from 'react-toastify';
import ModalHeader from '../common/ModalHeader';
import ModalContainer from '../common/ModalContainer';

const DebugModal = ({ sqlSchema, onClose }) => {
    if (!sqlSchema) return null;

    const colorScheme = {
        Invoice: 'text-red-500',
        Customer: 'text-green-500',
        Amount: 'text-blue-500',
        Date: 'text-purple-500',
        Status: 'text-orange-500',
    };

    const coloredSchema = sqlSchema.replace(/Invoice|Customer|Amount|Date|Status/g, (match) => {
        return `<span class="${colorScheme[match]}">${match}</span>`;
    });

    const copySchema = () => {
        navigator.clipboard.writeText(sqlSchema).then(() => {
            toast.success('SQL Schema copied to clipboard!', {
                position: "bottom-center",
                autoClose: 3000,
            });
        }).catch(err => {
            console.error('Failed to copy: ', err);
            toast.error('Failed to copy SQL Schema', {
                position: "bottom-center",
                autoClose: 3000,
            });
        });
    };

    return (
        <ModalContainer onClose={onClose}>
            <ModalHeader title="SQL Schema" onClose={onClose} />
            <div className="flex-1 overflow-y-auto p-6">
                <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap border mb-4" dangerouslySetInnerHTML={{ __html: coloredSchema }}></pre>
                <div className="flex justify-end mb-4">
                    <button 
                        onClick={copySchema}
                        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2"
                    >
                        <span>📋</span> Copy Schema
                    </button>
                </div>
                <div className="bg-gray-50 p-4 rounded border">
                    <h3 className="text-xl font-semibold mb-2">Schema Details</h3>
                    <p className={colorScheme.Invoice}><strong>Invoice:</strong> Unique identifier for each transaction.</p>
                    <p className={colorScheme.Customer}><strong>Customer:</strong> Name of the customer involved in the transaction.</p>
                    <p className={colorScheme.Amount}><strong>Amount:</strong> Total amount of the transaction.</p>
                    <p className={colorScheme.Date}><strong>Date:</strong> Date when the transaction occurred.</p>
                    <p className={colorScheme.Status}><strong>Status:</strong> Current user status (Active/Inactive).</p>
                </div>
            </div>
        </ModalContainer>
    );
};

export default DebugModal; 