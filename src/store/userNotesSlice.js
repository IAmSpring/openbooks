import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const userNotesSlice = createSlice({
  name: 'userNotes',
  initialState,
  reducers: {
    addNote: (state, action) => {
      const { userId, note } = action.payload;
      if (!state[userId]) {
        state[userId] = [];
      }
      state[userId].push(note);
      console.log('Updated notes state:', state[userId]);
    },
  },
});

export const { addNote } = userNotesSlice.actions;
export default userNotesSlice.reducer; 