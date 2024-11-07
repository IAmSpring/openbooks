class DataService {
    constructor(config) {
        this.config = config;
        this.filters = {};
        this.initialData = [];
    }

    setData(data) {
        this.initialData = this.validateData(data);
        return this;
    }

    validateData(data) {
        // Validate data against column config
        return data.filter(item => 
            this.config.columns.every(col => 
                typeof item[col.key] !== 'undefined'
            )
        );
    }

    applyFilters(filters) {
        return this.initialData.filter(item => 
            Object.entries(filters).every(([key, value]) => {
                const column = this.config.columns.find(col => col.key === key);
                if (!column) return true;

                switch (column.type) {
                    case 'select':
                        return value.includes(item[key]);
                    case 'number':
                        return item[key] >= value[0] && item[key] <= value[1];
                    case 'text':
                        return item[key].toLowerCase().includes(value.toLowerCase());
                    case 'status':
                        return value.includes(item[key]);
                    default:
                        return true;
                }
            })
        );
    }

    getUniqueValues(key) {
        return [...new Set(this.initialData.map(item => item[key]))];
    }
}

export default DataService; 