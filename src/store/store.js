import { configureStore } from '@reduxjs/toolkit';
import spreadsheetReducer from './spreadsheetSlice';
import userNotesReducer from './userNotesSlice';

// Load persisted notes
const loadPersistedNotes = () => {
    try {
        const persistedNotes = localStorage.getItem('userNotes');
        return persistedNotes ? JSON.parse(persistedNotes) : undefined;
    } catch (e) {
        console.error('Error loading persisted notes:', e);
        return undefined;
    }
};

export const store = configureStore({
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

// Subscribe to store changes to persist notes
store.subscribe(() => {
    const state = store.getState();
    localStorage.setItem('userNotes', JSON.stringify(state.userNotes));
});
