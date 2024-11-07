// src/SpreadsheetTable.js
import React, { memo, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const SpreadsheetTable = memo(({ data, onFiltersChange, onTotalCountChange, onUserSelect, filters }) => {
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedOccupations, setSelectedOccupations] = useState(() => [...new Set(data.rows.map(row => row[2]))]);
    const [ageFilter, setAgeFilter] = useState([0, 100]);
    const [nameFilter, setNameFilter] = useState('');
    const [emailFilter, setEmailFilter] = useState('');
    const [caseSensitive, setCaseSensitive] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selectedRow, setSelectedRow] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isFiltersCollapsed, setIsFiltersCollapsed] = useState(false);
    const [isMinAgeEditing, setIsMinAgeEditing] = useState(false);
    const [isMaxAgeEditing, setIsMaxAgeEditing] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(['Active', 'Inactive']);

    const uniqueValues = (index) => [...new Set(data.rows.map(row => row[index]))];

    const [selectedHobbies, setSelectedHobbies] = useState(uniqueValues(3));
    const [selectedColors, setSelectedColors] = useState(uniqueValues(4));
    const [selectedPets, setSelectedPets] = useState(uniqueValues(5));

    const handleFilterChange = useCallback(() => {
        const newFilters = {
            selectedOccupations,
            ageFilter,
            nameFilter,
            emailFilter,
            sortConfig,
            caseSensitive,
            selectedHobbies,
            selectedColors,
            selectedPets,
            selectedStatus
        };
        onFiltersChange(newFilters);
    }, [selectedOccupations, ageFilter, nameFilter, emailFilter, sortConfig, caseSensitive, 
        selectedHobbies, selectedColors, selectedPets, selectedStatus, onFiltersChange]);

    useEffect(() => {
        handleFilterChange();
    }, [handleFilterChange]);

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000); // Simulate loading delay
    }, []);

    useEffect(() => {
        document.documentElement.style.setProperty('--rows-per-page', rowsPerPage);
    }, [rowsPerPage]);

    const isValidData = data && data.headers && data.rows;

    const toggleSelection = (value, setSelected, allValues) => {
        setSelected((prev) => {
            if (prev.length === allValues.length) {
                return [value];
            }
            return prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value];
        });
    };

    const toggleSelectAll = (setSelected, values) => {
        setSelected((prev) => (prev.length === values.length ? [] : values));
    };

    const countUsersForSelection = (selectedItems, index) => {
        return data.rows.filter(row => selectedItems.includes(row[index])).length;
    };

    const filteredRows = React.useMemo(() => {
        const rows = data.rows.filter(row => {
            const [name, age, occupation, hobby, color, pet, email, , status] = row;
            const matchesOccupation = selectedOccupations.includes(occupation);
            const matchesAge = age >= ageFilter[0] && age <= ageFilter[1];
            const matchesHobby = selectedHobbies.includes(hobby);
            const matchesColor = selectedColors.includes(color);
            const matchesPet = selectedPets.includes(pet);
            const matchesStatus = selectedStatus.includes(status);
            const nameToCheck = caseSensitive ? name : name.toLowerCase();
            const filterToCheck = caseSensitive ? nameFilter : nameFilter.toLowerCase();
            const matchesName = nameToCheck.includes(filterToCheck);
            const matchesEmail = email.toLowerCase().includes(emailFilter.toLowerCase());
            return matchesOccupation && matchesAge && matchesHobby && matchesColor && matchesPet && matchesName && matchesEmail && matchesStatus;
        });
        return rows;
    }, [data.rows, selectedOccupations, ageFilter, nameFilter, emailFilter, caseSensitive, selectedHobbies, selectedColors, selectedPets, selectedStatus]);

    const sortedRows = React.useMemo(() => {
        if (sortConfig.key !== null && isValidData) {
            return [...filteredRows].sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return filteredRows;
    }, [filteredRows, sortConfig, isValidData]);

    const currentRows = React.useMemo(() => {
        const startIndex = (currentPage - 1) * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;
        return sortedRows.slice(startIndex, endIndex);
    }, [sortedRows, currentPage, rowsPerPage]);

    const totalPages = Math.max(1, Math.ceil(filteredRows.length / rowsPerPage));

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [totalPages, currentPage]);

    const requestSort = (index) => {
        let direction = 'ascending';
        if (sortConfig.key === index && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key: index, direction });
    };

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handlePageInput = (e) => {
        const page = Number(e.target.value);
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const uniqueOccupations = uniqueValues(2);

    const handleRowClick = (row) => {
        setSelectedRow(row);
        onUserSelect(row);
    };

    const renderFilterSection = (title, uniqueItems, selectedItems, setSelectedItems, index) => {
        const userCount = countUsersForSelection(selectedItems, index);
        const totalUsers = data.rows.length;
        return (
            <div className="mb-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">
                        {title} 
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full ml-2">{selectedItems.length} selected</span>
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full ml-2">{userCount} users found</span>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full ml-2">{totalUsers} total users</span>
                    </h3>
                    <button
                        onClick={() => toggleSelectAll(setSelectedItems, uniqueItems)}
                        className={`p-2 rounded border-2 ${
                            selectedItems.length === uniqueItems.length
                                ? 'bg-blue-500 text-white border-blue-500'
                                : 'bg-white text-black border-blue-200'
                        }`}
                    >
                        Select All
                    </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                    {uniqueItems.includes('') && (
                        <button
                            onClick={() => toggleSelection('', setSelectedItems, uniqueItems)}
                            className={`p-2 rounded border-2 opacity-50 ${
                                selectedItems.includes('')
                                    ? 'bg-blue-500 text-white border-blue-500'
                                    : 'bg-white text-black border-blue-200'
                            }`}
                        >
                            Null
                        </button>
                    )}
                    {uniqueItems.map((item, index) => item && (
                        <button
                            key={index}
                            onClick={() => toggleSelection(item, setSelectedItems, uniqueItems)}
                            className={`p-2 rounded border-2 ${
                                selectedItems.length === uniqueItems.length
                                    ? 'bg-white text-black border-blue-200'
                                    : selectedItems.includes(item)
                                    ? 'bg-blue-500 text-white border-blue-500'
                                    : 'bg-white text-black border-blue-200'
                            }`}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>
        );
    };

    const handleAgeInputChange = (value, isMin) => {
        const num = Math.min(Math.max(Number(value) || 0, 0), 100);
        if (isMin) {
            setAgeFilter([num, Math.max(num, ageFilter[1])]);
        } else {
            setAgeFilter([Math.min(ageFilter[0], num), num]);
        }
    };

    useEffect(() => {
        if (filters?.isReset) {
            // Reset all filter states to default
            setSelectedOccupations([...new Set(data.rows.map(row => row[2]))]);
            setSelectedHobbies([...new Set(data.rows.map(row => row[3]))]);
            setSelectedColors([...new Set(data.rows.map(row => row[4]))]);
            setSelectedPets([...new Set(data.rows.map(row => row[5]))]);
            setSelectedStatus(['Active', 'Inactive']);
            setAgeFilter([0, 100]);
            setNameFilter('');
            setEmailFilter('');
            setCaseSensitive(false);
            setSortConfig({ key: null, direction: 'ascending' });
            setCurrentPage(1);
        }
    }, [filters?.isReset, data.rows]);

    if (!isValidData) {
        return <div className="text-red-500">Error: Invalid data format</div>;
    }

    return (
        <div className="bg-gray-100 py-4">
            <div className="container mx-auto px-4">
                <div className="bg-white shadow-md rounded-lg p-4 border border-blue-300">
                    <div className="flex justify-between items-center mb-4">
                        <p className="text-gray-500">Select a user from the table or adjust filters</p>
                        <button 
                            onClick={() => setIsFiltersCollapsed(!isFiltersCollapsed)}
                            className="p-2 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 flex items-center gap-2"
                        >
                            {isFiltersCollapsed ? 'Show Filters' : 'Hide Filters'}
                            <span className={`transform transition-transform ${isFiltersCollapsed ? 'rotate-180' : ''}`}>
                                ▼
                            </span>
                        </button>
                    </div>

                    <motion.div 
                        className="filters mb-4"
                        initial={false}
                        animate={{
                            height: isFiltersCollapsed ? 0 : 'auto',
                            opacity: isFiltersCollapsed ? 0 : 1,
                            marginBottom: isFiltersCollapsed ? 0 : '1rem'
                        }}
                        transition={{ duration: 0.3 }}
                        style={{ overflow: 'hidden' }}
                    >
                        {renderFilterSection('Occupations', uniqueOccupations, selectedOccupations, setSelectedOccupations, 2)}
                        {renderFilterSection('Hobbies', uniqueValues(3), selectedHobbies, setSelectedHobbies, 3)}
                        {renderFilterSection('Favorite Colors', uniqueValues(4), selectedColors, setSelectedColors, 4)}
                        {renderFilterSection('Pets', uniqueValues(5), selectedPets, setSelectedPets, 5)}
                        {renderFilterSection('Status', ['Active', 'Inactive'], selectedStatus, setSelectedStatus, 8)}
                        <div className="age-filter mb-2 flex gap-4">
                            <label className="flex items-center gap-2">
                                Min Age: 
                                {isMinAgeEditing ? (
                                    <input
                                        type="number"
                                        min="0"
                                        max="100"
                                        value={ageFilter[0]}
                                        onChange={(e) => handleAgeInputChange(e.target.value, true)}
                                        onBlur={() => setIsMinAgeEditing(false)}
                                        className="w-16 border p-1 rounded border-blue-300"
                                        id="min-age-input"
                                    />
                                ) : (
                                    <button 
                                        onClick={() => setIsMinAgeEditing(true)}
                                        className="cursor-pointer hover:bg-blue-100 px-2 py-1 rounded"
                                        aria-label="Edit minimum age"
                                    >
                                        {ageFilter[0]}
                                    </button>
                                )}
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={ageFilter[0]}
                                    onChange={(e) => setAgeFilter([Number(e.target.value), ageFilter[1]])}
                                    className="ml-2"
                                />
                            </label>
                            <label className="flex items-center gap-2">
                                Max Age: 
                                {isMaxAgeEditing ? (
                                    <input
                                        type="number"
                                        min="0"
                                        max="100"
                                        value={ageFilter[1]}
                                        onChange={(e) => handleAgeInputChange(e.target.value, false)}
                                        onBlur={() => setIsMaxAgeEditing(false)}
                                        className="w-16 border p-1 rounded border-blue-300"
                                        id="max-age-input"
                                    />
                                ) : (
                                    <button 
                                        onClick={() => setIsMaxAgeEditing(true)}
                                        className="cursor-pointer hover:bg-blue-100 px-2 py-1 rounded"
                                        aria-label="Edit maximum age"
                                    >
                                        {ageFilter[1]}
                                    </button>
                                )}
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={ageFilter[1]}
                                    onChange={(e) => setAgeFilter([ageFilter[0], Number(e.target.value)])}
                                    className="ml-2"
                                />
                            </label>
                        </div>
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Filter by name"
                                value={nameFilter}
                                onChange={(e) => setNameFilter(e.target.value)}
                                className="w-full border p-2 rounded border-blue-300"
                            />
                            <input
                                type="text"
                                placeholder="Filter by email"
                                value={emailFilter}
                                onChange={(e) => setEmailFilter(e.target.value)}
                                className="w-full border p-2 rounded border-blue-300"
                            />
                            <div className="flex items-center">
                                <label className="flex items-center cursor-pointer">
                                    <span className="mr-2">Case Sensitive</span>
                                    <input
                                        type="checkbox"
                                        checked={caseSensitive}
                                        onChange={(e) => setCaseSensitive(e.target.checked)}
                                        className="form-checkbox h-4 w-4 text-blue-500 rounded border-blue-300"
                                    />
                                </label>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <label>
                                Rows per page:
                                <select value={rowsPerPage} onChange={(e) => setRowsPerPage(Number(e.target.value))} className="border p-2 ml-2 rounded border-blue-300">
                                    <option value={10}>10</option>
                                    <option value={100}>100</option>
                                    <option value={200}>200</option>
                                </select>
                            </label>
                        </div>
                    </motion.div>

                    <div className={`transition-all duration-300 ${isFiltersCollapsed ? 'mt-0' : 'mt-4'}`}>
                        <div className="overflow-x-auto">
                            <table className="spreadsheet-table w-full border-collapse rounded-lg overflow-hidden border border-blue-300">
                                <thead>
                                    <tr>
                                        {data.headers.map((header, index) => (
                                            <th key={index} scope="col" onClick={() => requestSort(index)} className="border p-2 cursor-pointer bg-gray-100">
                                                {header}
                                                {sortConfig.key === index ? (sortConfig.direction === 'ascending' ? ' 🔼' : ' 🔽') : null}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        Array.from({ length: rowsPerPage }).map((_, index) => (
                                            <tr key={index} className="animate-pulse">
                                                {data.headers.map((_, cellIndex) => (
                                                    <td key={cellIndex} className="border p-2">
                                                        <div className="h-4 bg-gray-200 rounded"></div>
                                                    </td>
                                                ))}
                                            </tr>
                                        ))
                                    ) : (
                                        currentRows.map((row, rowIndex) => (
                                            <motion.tr
                                                key={rowIndex}
                                                onClick={() => handleRowClick(row)}
                                                className={`cursor-pointer ${selectedRow === row ? 'bg-blue-100' : ''}`}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                style={{ backgroundColor: selectedRow === row ? 'rgba(173, 216, 230, 0.3)' : 'rgba(255, 255, 255, 0)' }}
                                                transition={{ duration: 0.5, delay: rowIndex * 0.05 }}
                                            >
                                                {row.map((cell, cellIndex) => (
                                                    <td key={cellIndex} className="border p-2">{cell}</td>
                                                ))}
                                            </motion.tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className="pagination flex justify-between items-center mt-4 flex-wrap gap-4">
                            <button 
                                onClick={() => handlePageChange(currentPage - 1)} 
                                disabled={currentPage === 1} 
                                className="border p-2 rounded border-blue-300 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                            >
                                ← Previous
                            </button>
                            <div className="flex items-center gap-2 flex-wrap justify-center">
                                <span>Page</span>
                                <input
                                    type="number"
                                    min="1"
                                    max={totalPages}
                                    value={currentPage}
                                    onChange={handlePageInput}
                                    className="border p-2 w-16 rounded border-blue-300 text-center"
                                />
                                <span>of {totalPages}</span>
                            </div>
                            <button 
                                onClick={() => handlePageChange(currentPage + 1)} 
                                disabled={currentPage === totalPages} 
                                className="border p-2 rounded border-blue-300 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                            >
                                Next →
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

SpreadsheetTable.propTypes = {
    data: PropTypes.shape({
        headers: PropTypes.arrayOf(PropTypes.string).isRequired,
        rows: PropTypes.arrayOf(PropTypes.array).isRequired
    }).isRequired,
    onFiltersChange: PropTypes.func.isRequired,
    onTotalCountChange: PropTypes.func.isRequired,
    onUserSelect: PropTypes.func.isRequired,
    filters: PropTypes.object
};

export default SpreadsheetTable;
