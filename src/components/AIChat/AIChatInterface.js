import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatButton from './ChatButton';
import { startDemo } from '../../services/demoService';

const AIChatInterface = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleDemoCommand = async (message) => {
        if (message.toLowerCase().includes('start demo')) {
            setIsLoading(true);
            const success = await startDemo('start demo', {
                onScroll: (element) => {
                    element.classList.add('demo-highlight', 'demo-pulse');
                    setTimeout(() => {
                        element.classList.remove('demo-highlight', 'demo-pulse');
                    }, 2000);
                },
                onSelectUser: (index) => {
                    const rows = document.querySelectorAll('.spreadsheet-table tbody tr');
                    if (rows[index]) {
                        rows[index].classList.add('demo-highlight');
                        setTimeout(() => {
                            rows[index].classList.remove('demo-highlight');
                            rows[index].click();
                        }, 1000);
                    }
                },
                onToggleFilters: (value) => {
                    const filterButton = document.querySelector('[aria-label="Toggle filters"]');
                    if (filterButton) {
                        filterButton.classList.add('demo-highlight');
                        setTimeout(() => {
                            filterButton.classList.remove('demo-highlight');
                            filterButton.click();
                        }, 1000);
                    }
                },
                onHighlight: (element) => {
                    element.classList.add('demo-highlight', 'demo-pulse');
                    setTimeout(() => {
                        element.classList.remove('demo-highlight', 'demo-pulse');
                    }, 2000);
                },
                onApplyFilter: (filterConfig) => {
                    // Handle filter application
                    // This will be connected to your existing filter state management
                },
                onShowVisualization: (chartType) => {
                    const chart = document.querySelector(`.${chartType}-chart`);
                    if (chart) {
                        chart.classList.add('demo-highlight', 'demo-pulse');
                        setTimeout(() => {
                            chart.classList.remove('demo-highlight', 'demo-pulse');
                        }, 2000);
                    }
                },
                onMessage: (text) => {
                    setMessages(prev => [...prev, {
                        role: 'assistant',
                        content: text,
                        timestamp: new Date().toISOString()
                    }]);
                }
            });

            if (!success) {
                setMessages(prev => [...prev, {
                    role: 'assistant',
                    content: "I'm sorry, I couldn't start the demo. Please try again.",
                    timestamp: new Date().toISOString()
                }]);
            }
            setIsLoading(false);
            return true;
        }
        return false;
    };

    const handleSendMessage = async () => {
        if (!inputMessage.trim()) return;

        const newMessage = {
            role: 'user',
            content: inputMessage,
            timestamp: new Date().toISOString()
        };

        setMessages(prev => [...prev, newMessage]);
        setInputMessage('');
        setIsLoading(true);

        // Check for demo command
        const isDemoCommand = await handleDemoCommand(inputMessage);
        if (isDemoCommand) return;

        try {
            // In development, use mock response
            if (process.env.NODE_ENV === 'development') {
                setTimeout(() => {
                    const mockResponse = {
                        role: 'assistant',
                        content: `This is a mock response to: "${inputMessage}"`,
                        timestamp: new Date().toISOString()
                    };
                    setMessages(prev => [...prev, mockResponse]);
                    setIsLoading(false);
                }, 1000);
                return;
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setMessages(prev => [...prev, {
                role: 'system',
                content: 'Sorry, there was an error processing your message.',
                timestamp: new Date().toISOString()
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const MessageBubble = ({ message }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
        >
            <div
                className={`max-w-[70%] rounded-lg p-4 ${
                    message.role === 'user' 
                        ? 'bg-blue-500 text-white rounded-br-none'
                        : 'bg-gray-100 text-gray-800 rounded-bl-none'
                }`}
            >
                <p className="text-sm">{message.content}</p>
                <p className="text-xs mt-1 opacity-70">
                    {new Date(message.timestamp).toLocaleTimeString()}
                </p>
            </div>
        </motion.div>
    );

    return (
        <>
            <ChatButton onClick={() => setIsOpen(true)} isOpen={isOpen} />
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        className="fixed bottom-8 right-8 w-96 h-[600px] bg-white rounded-lg shadow-xl flex flex-col z-50"
                        initial={{ opacity: 0, y: 100, scale: 0.3 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.3 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    >
                        <div className="p-4 border-b bg-blue-500 text-white rounded-t-lg flex justify-between items-center">
                            <h3 className="text-lg font-semibold">AI Assistant</h3>
                            <button 
                                onClick={() => setIsOpen(false)}
                                className="text-white hover:text-red-200 transition-colors"
                            >
                                ×
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4">
                            <AnimatePresence>
                                {messages.map((message, index) => (
                                    <MessageBubble key={index} message={message} />
                                ))}
                            </AnimatePresence>
                            {isLoading && (
                                <div className="flex justify-start mb-4">
                                    <motion.div
                                        className="bg-gray-100 rounded-lg p-4 max-w-[70%]"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                    >
                                        <div className="flex space-x-2">
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                                        </div>
                                    </motion.div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        <div className="p-4 border-t">
                            <div className="flex space-x-2">
                                <input
                                    type="text"
                                    value={inputMessage}
                                    onChange={(e) => setInputMessage(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                    placeholder="Type your message..."
                                    className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                    onClick={handleSendMessage}
                                    disabled={isLoading || !inputMessage.trim()}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default AIChatInterface; 