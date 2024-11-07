import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { motion, AnimatePresence } from 'framer-motion';

// Memoized selector for better performance
const selectUserNotes = createSelector(
    [(state) => state.userNotes, (_, userId) => userId],
    (userNotes, userId) => {
        const notes = userNotes[userId] || [];
        console.log('NotesDisplay - Selected notes for', userId, ':', notes);
        return notes;
    }
);

const FileIcon = ({ type }) => {
    const iconMap = {
        'PDF': '📄',
        'CSV': '📊',
        'DOCX': '📝',
        'Image': '🖼️',
        'default': '📎'
    };
    return <span className="mr-2">{iconMap[type] || iconMap.default}</span>;
};

const LoadingNotes = () => (
    <div className="space-y-4 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="space-y-3">
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
        </div>
    </div>
);

const EmptyNotes = () => (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-8 px-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300"
    >
        <svg 
            className="w-12 h-12 text-gray-400 mx-auto mb-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
        >
            <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" 
            />
        </svg>
        <p className="text-lg font-semibold text-gray-600">No notes yet</p>
        <p className="text-gray-500 mt-2">
            Add notes using the form above to keep track of important information
        </p>
    </motion.div>
);

const NoteItem = ({ note, userId, index }) => (
    <motion.div 
        key={`${userId}-note-${index}`} 
        className="p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
    >
        {note.text && (
            <p className="text-gray-700 mb-3 whitespace-pre-wrap">{note.text}</p>
        )}
        {note.files && note.files.length > 0 && (
            <div className="mt-3 border-t pt-3">
                <h4 className="text-sm font-semibold text-gray-600 mb-2">
                    Attachments ({note.files.length}):
                </h4>
                <ul className="space-y-2">
                    {note.files.map((file, fileIndex) => (
                        <li 
                            key={`${userId}-file-${fileIndex}`}
                            className="flex items-center text-blue-500 hover:text-blue-700 cursor-pointer transition-colors"
                            onClick={() => window.open(file.ref, '_blank')}
                        >
                            <FileIcon type={file.type} />
                            <span className="hover:underline truncate">{file.name}</span>
                        </li>
                    ))}
                </ul>
            </div>
        )}
        <div className="mt-3 text-right">
            <p className="text-xs text-gray-400">
                {new Date(note.timestamp).toLocaleString()}
            </p>
        </div>
    </motion.div>
);

const NotesDisplay = ({ userId }) => {
    const [isLoading, setIsLoading] = useState(true);
    const notes = useSelector(state => selectUserNotes(state, userId));

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        console.log('NotesDisplay - Current notes:', notes);
    }, [notes]);

    return (
        <div className="mt-8 space-y-4 border-t pt-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
                Notes History 
                <span className="text-sm font-normal text-gray-500">
                    ({notes?.length || 0} notes)
                </span>
            </h3>

            <AnimatePresence mode="wait">
                {isLoading ? (
                    <LoadingNotes />
                ) : !notes?.length ? (
                    <EmptyNotes />
                ) : (
                    <motion.div 
                        className="space-y-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {notes.map((note, index) => (
                            <NoteItem 
                                key={`${userId}-note-${index}-${note.timestamp}`}
                                note={note}
                                userId={userId}
                                index={index}
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default React.memo(NotesDisplay);