import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import UserNotes from './UserNotes';

const mockStore = configureStore([]);

test('adds a note', () => {
  const store = mockStore({ userNotes: {} });
  const { getByPlaceholderText, getByText } = render(
    <Provider store={store}>
      <UserNotes userId="1" />
    </Provider>
  );

  fireEvent.change(getByPlaceholderText('Add a note...'), { target: { value: 'Test note' } });
  fireEvent.click(getByText('Add Note'));

  const actions = store.getActions();
  expect(actions[0].type).toBe('userNotes/addNote');
  expect(actions[0].payload).toEqual({ userId: '1', note: { text: 'Test note', timestamp: expect.any(String) } });
}); 