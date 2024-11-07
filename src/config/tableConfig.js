export const userTableConfig = {
    columns: [
        {
            key: 'name',
            label: 'Name',
            type: 'text',
            filterable: true,
            sortable: true,
            filterType: 'search'
        },
        {
            key: 'age',
            label: 'Age',
            type: 'number',
            filterable: true,
            sortable: true,
            filterType: 'range',
            range: { min: 0, max: 100, step: 1 }
        },
        {
            key: 'status',
            label: 'Status',
            type: 'status',
            filterable: true,
            sortable: true,
            filterType: 'multi',
            statusConfig: {
                options: [
                    { value: 'Active', color: 'green' },
                    { value: 'Inactive', color: 'red' }
                ]
            }
        }
        // ... other columns
    ],
    defaultSort: { key: 'name', direction: 'asc' },
    defaultFilters: {},
    rowsPerPageOptions: [10, 25, 50, 100],
    defaultRowsPerPage: 10
}; 