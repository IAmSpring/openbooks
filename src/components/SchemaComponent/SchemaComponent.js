import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SchemaComponent = ({ data, filters, totalCount, isVisible }) => {
    const [summary, setSummary] = useState([]);

    useEffect(() => {
        const generateSummary = () => {
            const { selectedOccupations = [], ageFilter = [0, 100], selectedStatus = [] } = filters || {};
            return [
                { title: 'Total Transactions', content: `${totalCount}` },
                { title: 'Occupations', content: selectedOccupations.length ? selectedOccupations.join(', ') : 'All' },
                { title: 'Age Range', content: `Between ${ageFilter[0]} and ${ageFilter[1]}` },
                { title: 'Status', content: selectedStatus.length ? selectedStatus.join(', ') : 'All' },
            ];
        };

        setSummary(generateSummary());
    }, [data, filters, totalCount]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white shadow-lg rounded-lg p-6 m-4 border border-gray-200"
                >
                    <h2 className="text-2xl font-bold mb-4 border-b pb-2">Summary</h2>
                    <div className="mt-4 bg-gray-100 p-4 rounded border">
                        {summary.map((item, index) => (
                            <div key={index} className="mb-4">
                                <h3 className="text-lg font-semibold">{item.title}</h3>
                                <p>{item.content}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SchemaComponent; 