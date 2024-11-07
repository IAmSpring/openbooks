import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import SpreadsheetTable from '../SpreadsheetTable';

const mockStore = configureStore([]);

describe('SpreadsheetTable', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      spreadsheet: {
        filters: {
          selectedOccupations: [],
          ageFilter: [0, 100],
          nameFilter: '',
          sortConfig: { key: null, direction: 'ascending' }
        },
        totalCount: 0,
        currentPage: 1,
        rowsPerPage: 10
      }
    });
  });

  it('renders table headers correctly', () => {
    render(
      <Provider store={store}>
        <SpreadsheetTable data={{ headers: ['Name', 'Age'], rows: [] }} />
      </Provider>
    );
    
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
  });

  it('handles occupation filter changes', () => {
    render(
      <Provider store={store}>
        <SpreadsheetTable 
          data={{
            headers: ['Name', 'Age', 'Occupation'],
            rows: [{ occupation: 'Engineer' }]
          }}
        />
      </Provider>
    );

    const occupationSelect = screen.getByRole('listbox');
    fireEvent.change(occupationSelect, { target: { value: 'Engineer' } });
    
    const actions = store.getActions();
    expect(actions).toContainEqual(
      expect.objectContaining({
        type: 'spreadsheet/setFilters',
        payload: expect.objectContaining({
          selectedOccupations: ['Engineer']
        })
      })
    );
  });
}); 