import { configureStore } from '@reduxjs/toolkit';
import spreadsheetReducer from './spreadsheetSlice';
import userNotesReducer from './userNotesSlice';

// Load persisted notes on startup
const loadPersistedNotes = () => {
    try {
        const persistedNotes = localStorage.getItem('userNotes');
        return persistedNotes ? JSON.parse(persistedNotes) : undefined;
    } catch (e) {
        console.error('Error loading persisted notes:', e);
        return undefined;
    }
};

const store = configureStore({
    reducer: {
        spreadsheet: spreadsheetReducer,
        userNotes: userNotesReducer
    },
    preloadedState: {
        userNotes: loadPersistedNotes()
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['spreadsheet/setFilters'],
                ignoredActionPaths: ['payload.filterFunction'],
                ignoredPaths: ['spreadsheet.filters.filterFunction'],
            },
        }),
});

// Save to localStorage when store changes
let timeoutId;
store.subscribe(() => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
        const state = store.getState();
        localStorage.setItem('userNotes', JSON.stringify(state.userNotes));
    }, 1000);
});

export { store };
