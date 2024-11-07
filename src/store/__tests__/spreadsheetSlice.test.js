import spreadsheetReducer, {
  setFilters,
  setTotalCount,
  setSelectedUser,
  setCurrentPage
} from '../spreadsheetSlice';

describe('spreadsheet reducer', () => {
  const initialState = {
    filters: {
      selectedOccupations: [],
      ageFilter: [0, 100],
      nameFilter: '',
      sortConfig: { key: null, direction: 'ascending' }
    },
    totalCount: 0,
    selectedUser: null,
    currentPage: 1,
    rowsPerPage: 10
  };

  it('should handle initial state', () => {
    expect(spreadsheetReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setFilters', () => {
    const filters = {
      selectedOccupations: ['Engineer'],
      ageFilter: [25, 45],
      nameFilter: 'John',
      sortConfig: { key: 'name', direction: 'ascending' }
    };
    const actual = spreadsheetReducer(initialState, setFilters(filters));
    expect(actual.filters).toEqual(filters);
  });

  it('should handle setTotalCount', () => {
    const actual = spreadsheetReducer(initialState, setTotalCount(100));
    expect(actual.totalCount).toEqual(100);
  });

  it('should handle setSelectedUser', () => {
    const user = { id: 1, name: 'John Doe' };
    const actual = spreadsheetReducer(initialState, setSelectedUser(user));
    expect(actual.selectedUser).toEqual(user);
  });
}); 