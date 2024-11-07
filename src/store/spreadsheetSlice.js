import { createSlice } from '@reduxjs/toolkit';
import data from '../components/SpreadsheetTable/dummyData.json';

const initialState = {
    data: data,
    filters: {
        selectedOccupations: [...new Set(data.rows.map(row => row[2]))],
        selectedHobbies: [...new Set(data.rows.map(row => row[3]))],
        selectedColors: [...new Set(data.rows.map(row => row[4]))],
        selectedPets: [...new Set(data.rows.map(row => row[5]))],
        selectedStatus: ['Active', 'Inactive'],
        ageFilter: [0, 100],
        nameFilter: '',
        emailFilter: '',
        sortConfig: { key: null, direction: 'ascending' },
        caseSensitive: false
    },
    totalCount: data.rows.length,
    selectedUser: null,
    showDebugModal: false,
    showConfigsModal: false,
    sqlSchema: '',
    configs: JSON.parse(localStorage.getItem('configs')) || [],
    isSaveDisabled: false,
    isNavExpanded: false,
    showSplash: true,
    showSummary: true,
    currentPage: 1
};

const spreadsheetSlice = createSlice({
    name: 'spreadsheet',
    initialState,
    reducers: {
        setFilters: (state, action) => {
            state.filters = action.payload;
            state.isSaveDisabled = false;
        },
        setTotalCount: (state, action) => {
            state.totalCount = action.payload;
        },
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
        },
        setShowDebugModal: (state, action) => {
            state.showDebugModal = action.payload;
        },
        setShowConfigsModal: (state, action) => {
            state.showConfigsModal = action.payload;
        },
        setSqlSchema: (state, action) => {
            state.sqlSchema = action.payload;
        },
        setConfigs: (state, action) => {
            state.configs = action.payload;
            localStorage.setItem('configs', JSON.stringify(action.payload));
        },
        setIsSaveDisabled: (state, action) => {
            state.isSaveDisabled = action.payload;
        },
        setIsNavExpanded: (state, action) => {
            state.isNavExpanded = action.payload;
        },
        setShowSplash: (state, action) => {
            state.showSplash = action.payload;
        },
        setShowSummary: (state, action) => {
            state.showSummary = action.payload;
        },
        setSortConfig: (state, action) => {
            state.filters.sortConfig = action.payload;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        resetFilters: (state) => {
            state.filters = {
                selectedOccupations: [...new Set(data.rows.map(row => row[2]))],
                selectedHobbies: [...new Set(data.rows.map(row => row[3]))],
                selectedColors: [...new Set(data.rows.map(row => row[4]))],
                selectedPets: [...new Set(data.rows.map(row => row[5]))],
                selectedStatus: ['Active', 'Inactive'],
                ageFilter: [0, 100],
                nameFilter: '',
                emailFilter: '',
                sortConfig: { key: null, direction: 'ascending' },
                caseSensitive: false
            };
            state.currentPage = 1;
            state.isNavExpanded = false;
        }
    }
});

export const {
    setFilters,
    setTotalCount,
    setSelectedUser,
    setShowDebugModal,
    setShowConfigsModal,
    setSqlSchema,
    setConfigs,
    setIsSaveDisabled,
    setIsNavExpanded,
    setShowSplash,
    setShowSummary,
    setSortConfig,
    setCurrentPage,
    resetFilters
} = spreadsheetSlice.actions;

export default spreadsheetSlice.reducer;
