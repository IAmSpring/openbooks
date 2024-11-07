import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SpreadsheetTable from './SpreadsheetTable';
import data from './dummyData.json';

test('renders table headers', () => {
    render(<SpreadsheetTable data={data} />);
    data.headers.forEach(header => {
        expect(screen.getByText(header)).toBeInTheDocument();
    });
});

test('renders correct number of rows per page', () => {
    render(<SpreadsheetTable data={data} />);
    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(11); // 10 data rows + 1 header row
});

test('pagination works correctly', () => {
    render(<SpreadsheetTable data={data} />);
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);
    expect(screen.getByText('Page 2 of 8')).toBeInTheDocument();
}); 