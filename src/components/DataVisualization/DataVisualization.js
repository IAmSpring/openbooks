import React, { useMemo } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const DataVisualization = ({ data, filters, filteredCount }) => {
    const ageData = useMemo(() => {
        const ageGroups = {
            '0-20': 0,
            '21-30': 0,
            '31-40': 0,
            '41-50': 0,
            '51+': 0
        };

        data.rows.forEach(row => {
            const age = row[1];
            if (age <= 20) ageGroups['0-20']++;
            else if (age <= 30) ageGroups['21-30']++;
            else if (age <= 40) ageGroups['31-40']++;
            else if (age <= 50) ageGroups['41-50']++;
            else ageGroups['51+']++;
        });

        return Object.entries(ageGroups).map(([range, count]) => ({
            range,
            count
        }));
    }, [data.rows]);

    const occupationData = useMemo(() => {
        const occCount = {};
        data.rows.forEach(row => {
            const occ = row[2];
            occCount[occ] = (occCount[occ] || 0) + 1;
        });

        return Object.entries(occCount)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 5); // Top 5 occupations
    }, [data.rows]);

    const filterImpactData = useMemo(() => {
        return [
            { name: 'Total Records', count: data.rows.length },
            { name: 'After Filters', count: filteredCount }
        ];
    }, [data.rows.length, filteredCount]);

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 m-4 border border-gray-200">
            <h2 className="text-2xl font-bold mb-6">Data Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Age Distribution */}
                <div className="h-80">
                    <h3 className="text-lg font-semibold mb-2">Age Distribution</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={ageData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="range" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="count" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Top 5 Occupations */}
                <div className="h-80">
                    <h3 className="text-lg font-semibold mb-2">Top Occupations</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={occupationData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                label
                            >
                                {occupationData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Filter Impact */}
                <div className="h-80">
                    <h3 className="text-lg font-semibold mb-2">Filter Impact</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={filterImpactData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="count" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default DataVisualization; 