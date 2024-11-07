import { useState, useCallback, useMemo } from 'react';
import DataService from '../services/DataService';

export const useDataTable = (config, initialData) => {
    const [filters, setFilters] = useState(config.defaultFilters || {});
    const [sortConfig, setSortConfig] = useState(config.defaultSort || null);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(config.defaultRowsPerPage || 10);

    const dataService = useMemo(() => new DataService(config), [config]);
    dataService.setData(initialData);

    const filteredData = useMemo(() => {
        return dataService.applyFilters(filters);
    }, [dataService, filters]);

    const sortedData = useMemo(() => {
        if (!sortConfig) return filteredData;
        
        return [...filteredData].sort((a, b) => {
            const column = config.columns.find(col => col.key === sortConfig.key);
            const aVal = column.formatter ? column.formatter(a[sortConfig.key]) : a[sortConfig.key];
            const bVal = column.formatter ? column.formatter(b[sortConfig.key]) : b[sortConfig.key];
            
            return sortConfig.direction === 'asc' ? 
                aVal > bVal ? 1 : -1 :
                aVal < bVal ? 1 : -1;
        });
    }, [filteredData, sortConfig]);

    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * rowsPerPage;
        return sortedData.slice(start, start + rowsPerPage);
    }, [sortedData, currentPage, rowsPerPage]);

    return {
        data: paginatedData,
        totalCount: filteredData.length,
        filters,
        setFilters,
        sortConfig,
        setSortConfig,
        currentPage,
        setCurrentPage,
        rowsPerPage,
        setRowsPerPage,
        getUniqueValues: useCallback((key) => dataService.getUniqueValues(key), [dataService])
    };
}; 