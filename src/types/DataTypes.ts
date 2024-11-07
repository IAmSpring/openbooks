interface ColumnConfig {
    key: string;
    label: string;
    type: 'text' | 'number' | 'select' | 'date' | 'status';
    filterable?: boolean;
    sortable?: boolean;
    filterType?: 'multi' | 'range' | 'search';
    options?: string[];  // For select/multi-select fields
    range?: {
        min: number;
        max: number;
        step: number;
    };
    formatter?: (value: any) => string;
    width?: string;
    statusConfig?: {
        options: { value: string; color: string; }[];
    };
}

interface TableConfig {
    columns: ColumnConfig[];
    defaultSort?: { key: string; direction: 'asc' | 'desc' };
    defaultFilters?: Record<string, any>;
    rowsPerPageOptions?: number[];
    defaultRowsPerPage?: number;
} 