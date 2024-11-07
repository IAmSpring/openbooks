import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SpreadsheetTable from './components/SpreadsheetTable/SpreadsheetTable';
import SchemaComponent from './components/SchemaComponent/SchemaComponent';
import UserModal from './components/UserModal/UserModal';
import DebugModal from './components/DebugModal/DebugModal';
import ConfigsModal from './components/ConfigsModal/ConfigsModal';
import Footer from './components/Footer/Footer';
import SplashScreen from './components/SplashScreen/SplashScreen';
import data from './components/SpreadsheetTable/dummyData.json';
import CookieConsent from './components/CookieConsent/CookieConsent';
import Sparkle from './components/Sparkle/Sparkle';
import AIChatInterface from './components/AIChat/AIChatInterface';

function App() {
    const [filters, setFilters] = useState({
        selectedOccupations: [...new Set(data.rows.map(row => row[2]))],
        ageFilter: [0, 100],
        nameFilter: '',
        sortConfig: { key: null, direction: 'ascending' },
        selectedStatus: ['Active', 'Inactive'],
        caseSensitive: false
    });

    const [totalCount, setTotalCount] = useState(data.rows.length);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showDebugModal, setShowDebugModal] = useState(false);
    const [showConfigsModal, setShowConfigsModal] = useState(false);
    const [sqlSchema, setSqlSchema] = useState('');
    const [configs, setConfigs] = useState(() => JSON.parse(localStorage.getItem('configs')) || []);
    const [isSaveDisabled, setIsSaveDisabled] = useState(false);
    const [isNavExpanded, setIsNavExpanded] = useState(false);
    const [showSplash, setShowSplash] = useState(true);
    const [showSummary, setShowSummary] = useState(true);

    const handleFiltersChange = useCallback((newFilters) => {
        setFilters(newFilters);
        setIsSaveDisabled(false);
    }, []);

    const handleTotalCountChange = useCallback((count) => {
        setTotalCount(count);
    }, []);

    const handleUserSelect = (user) => {
        setSelectedUser(user);
    };

    const closeModal = () => {
        setSelectedUser(null);
    };

    const toggleDebugModal = () => {
        setSqlSchema(generateSQLSchema());
        setShowDebugModal(!showDebugModal);
    };

    const generateSQLSchema = () => {
        const { selectedOccupations, ageFilter, nameFilter, sortConfig, selectedStatus } = filters;
        let whereClauses = [];

        if (selectedOccupations.length > 0) {
            const occupations = selectedOccupations.map(occ => `'${occ}'`).join(', ');
            whereClauses.push(`Occupation IN (${occupations})`);
        }

        if (ageFilter[0] > 0 || ageFilter[1] < 100) {
            whereClauses.push(`Age BETWEEN ${ageFilter[0]} AND ${ageFilter[1]}`);
        }

        if (nameFilter) {
            whereClauses.push(`Name LIKE '%${nameFilter}%'`);
        }

        if (selectedStatus && selectedStatus.length > 0) {
            const statuses = selectedStatus.map(status => `'${status}'`).join(', ');
            whereClauses.push(`Status IN (${statuses})`);
        }

        const orderBy = sortConfig.key !== null ? `ORDER BY ${data.headers[sortConfig.key]} ${sortConfig.direction.toUpperCase()}` : '';

        const whereClause = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

        return `SELECT Invoice, Customer, Amount, Date, Status FROM transactions ${whereClause} ${orderBy};`;
    };

    const saveConfig = () => {
        const config = {
            selectedOccupations: filters.selectedOccupations,
            ageFilter: filters.ageFilter,
            nameFilter: filters.nameFilter,
            sortConfig: filters.sortConfig,
            caseSensitive: filters.caseSensitive,
            sqlSchema: generateSQLSchema(),
            totalCount,
            timestamp: new Date().toISOString(),
        };

        const updatedConfigs = [...configs, config];
        setConfigs(updatedConfigs);
        localStorage.setItem('configs', JSON.stringify(updatedConfigs));

        toast.success('Configuration saved!', {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        setIsSaveDisabled(true);
        setIsNavExpanded(false);
    };

    const clearConfigs = () => {
        setConfigs([]);
        localStorage.removeItem('configs');
        toast.info('All configurations cleared', {
            position: "bottom-center",
            autoClose: 3000,
        });
    };

    const loadConfig = (config) => {
        setFilters({
            selectedOccupations: config.selectedOccupations,
            ageFilter: config.ageFilter,
            nameFilter: config.nameFilter,
            sortConfig: config.sortConfig,
            caseSensitive: config.caseSensitive,
        });

        toast.info(`Configuration loaded from ${new Date(config.timestamp).toLocaleString()}`, {
            position: "bottom-center",
            autoClose: 3000,
        });
        setIsSaveDisabled(false);
        setShowConfigsModal(false);
    };

    const deleteConfig = (index) => {
        const updatedConfigs = configs.filter((_, i) => i !== index);
        setConfigs(updatedConfigs);
        localStorage.setItem('configs', JSON.stringify(updatedConfigs));
        toast.error('Configuration deleted!', {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const handleLoadConfigClick = () => {
        setShowConfigsModal(true);
        setIsNavExpanded(false);
    };

    const handleSQLSchemaClick = () => {
        toggleDebugModal();
        setIsNavExpanded(false);
    };

    const resetFilters = () => {
        const defaultFilters = {
            selectedOccupations: [...new Set(data.rows.map(row => row[2]))],
            selectedHobbies: [...new Set(data.rows.map(row => row[3]))],
            selectedColors: [...new Set(data.rows.map(row => row[4]))],
            selectedPets: [...new Set(data.rows.map(row => row[5]))],
            selectedStatus: ['Active', 'Inactive'],
            ageFilter: [0, 100],
            nameFilter: '',
            emailFilter: '',
            sortConfig: { key: null, direction: 'ascending' },
            caseSensitive: false,
            isReset: true
        };

        setFilters(defaultFilters);
        handleFiltersChange(defaultFilters);

        toast.info('All filters reset to default', {
            position: "bottom-center",
            autoClose: 3000,
        });
        setIsNavExpanded(false);
    };

    const handleLogoClick = () => {
        setShowSummary(!showSummary);
    };

    const NavButton = ({ onClick, disabled, className, children }) => (
        <motion.button
            onClick={onClick}
            disabled={disabled}
            className={className}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            whileHover={{ scale: 1.05 }}
        >
            {children}
        </motion.button>
    );

    const HamburgerIcon = ({ isOpen, onClick }) => (
        <button
            onClick={onClick}
            className="p-2 rounded hover:bg-blue-600 transition-colors duration-200"
        >
            <div className="w-6 h-5 relative flex flex-col justify-between">
                <motion.span
                    className="w-full h-0.5 bg-white rounded-full block"
                    animate={isOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.2 }}
                />
                <motion.span
                    className="w-full h-0.5 bg-white rounded-full block"
                    animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                    transition={{ duration: 0.2 }}
                />
                <motion.span
                    className="w-full h-0.5 bg-white rounded-full block"
                    animate={isOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.2 }}
                />
            </div>
        </button>
    );

    const sparkles = Array.from({ length: 10 }, (_, i) => (
        <Sparkle key={i} delay={i * 0.2} />
    ));

    if (showSplash) {
        return <SplashScreen onComplete={() => setShowSplash(false)} />;
    }

    return (
        <div className="App min-h-screen flex flex-col">
            <ToastContainer
                position="bottom-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <nav className="bg-blue-500 p-4 flex justify-between items-center fixed top-0 left-0 right-0 shadow-md z-10">
                <div className="relative">
                    <motion.h1
                        className="text-white text-3xl cursor-pointer"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                        whileHover={{ scale: 1.1, textShadow: "0px 0px 8px rgb(255,255,255)" }}
                        onClick={handleLogoClick}
                    >
                        OpenBooks
                    </motion.h1>
                    {sparkles}
                </div>
                <div className="relative">
                    <HamburgerIcon 
                        isOpen={isNavExpanded} 
                        onClick={() => setIsNavExpanded(!isNavExpanded)} 
                    />
                    <AnimatePresence>
                        {isNavExpanded && (
                            <motion.div
                                className="absolute right-0 top-12 bg-white rounded-lg shadow-lg overflow-hidden"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="p-2 flex flex-col gap-2">
                                    <NavButton
                                        onClick={handleLoadConfigClick}
                                        disabled={configs.length === 0}
                                        className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:opacity-50 whitespace-nowrap"
                                    >
                                        Load Config
                                    </NavButton>
                                    <NavButton
                                        onClick={saveConfig}
                                        disabled={isSaveDisabled}
                                        className="p-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 whitespace-nowrap"
                                    >
                                        Save Config
                                    </NavButton>
                                    <NavButton
                                        onClick={resetFilters}
                                        className="p-2 bg-red-500 text-white rounded hover:bg-red-600 whitespace-nowrap"
                                    >
                                        Reset Filters
                                    </NavButton>
                                    <NavButton
                                        onClick={() => {}}
                                        disabled={true}
                                        className="p-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50 whitespace-nowrap flex items-center gap-2"
                                    >
                                        <svg 
                                            className="w-4 h-4" 
                                            fill="none" 
                                            stroke="currentColor" 
                                            viewBox="0 0 24 24"
                                        >
                                            <path 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round" 
                                                strokeWidth={2} 
                                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                            />
                                        </svg>
                                        Upload from Source
                                        <span className="text-xs opacity-75">(Coming Soon)</span>
                                    </NavButton>
                                    <NavButton
                                        onClick={handleSQLSchemaClick}
                                        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 whitespace-nowrap"
                                    >
                                        SQL Schema
                                    </NavButton>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </nav>
            <main className="flex-grow pt-20">
                {showConfigsModal && (
                    <ConfigsModal
                        configs={configs}
                        onClose={() => setShowConfigsModal(false)}
                        onLoadConfig={loadConfig}
                        onDeleteConfig={deleteConfig}
                        onClearConfigs={clearConfigs}
                    />
                )}
                <SchemaComponent 
                    data={data} 
                    filters={filters} 
                    totalCount={totalCount} 
                    isVisible={showSummary}
                />
                <SpreadsheetTable
                    data={data}
                    filters={filters}
                    onFiltersChange={handleFiltersChange}
                    onTotalCountChange={handleTotalCountChange}
                    onUserSelect={handleUserSelect}
                />
                <UserModal user={selectedUser} onClose={closeModal} />
                {showDebugModal && <DebugModal sqlSchema={sqlSchema} onClose={toggleDebugModal} />}
            </main>
            <Footer />
            <CookieConsent />
            <AIChatInterface />
        </div>
    );
}

export default App;
