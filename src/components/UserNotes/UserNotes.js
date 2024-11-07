import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNote } from '../../store/userNotesSlice';
import { toast } from 'react-toastify';
import { saveToCache } from '../../data/uploadsCache';
import { createSelector } from '@reduxjs/toolkit';

const ALLOWED_FILE_TYPES = {
    'image/jpeg': 'Image',
    'image/png': 'Image',
    'image/gif': 'Image',
    'application/pdf': 'PDF',
    'text/csv': 'CSV',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'DOCX'
};

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const selectUserNotes = createSelector(
    [(state) => state.userNotes, (_, userId) => userId],
    (userNotes, userId) => userNotes[userId] || []
);

const UserNotes = ({ userId }) => {
    const [note, setNote] = useState('');
    const [files, setFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
    const dispatch = useDispatch();

    const currentNotes = useSelector(state => selectUserNotes(state, userId));

    // Debug effect
    useEffect(() => {
        console.log('Notes updated for userId:', userId, currentNotes);
    }, [currentNotes, userId]);

    const generateFileReference = (file) => {
        const timestamp = new Date().getTime();
        const fileExt = file.name.split('.').pop();
        return `uploads/${userId}/${timestamp}.${fileExt}`;
    };

    const handleFileChange = async (e) => {
        const newFiles = Array.from(e.target.files).filter(validateFile);
        
        if (newFiles.length) {
            const fileRefs = await Promise.all(newFiles.map(async file => {
                const fileRef = generateFileReference(file);
                const fileData = {
                    name: file.name,
                    type: ALLOWED_FILE_TYPES[file.type],
                    size: file.size,
                    ref: fileRef,
                    timestamp: new Date().toISOString()
                };

                // Save to cache during development
                if (process.env.NODE_ENV === 'development') {
                    await saveToCache(userId, fileRef, file);
                }

                return fileData;
            }));

            setFiles(prev => [...prev, ...fileRefs]);
            setPreviews(prev => [...prev, ...fileRefs]);
        }
    };

    const validateFile = (file) => {
        if (!ALLOWED_FILE_TYPES[file.type]) {
            toast.error(`File type ${file.type} not supported`);
            return false;
        }
        if (file.size > MAX_FILE_SIZE) {
            toast.error(`File ${file.name} is too large (max 5MB)`);
            return false;
        }
        return true;
    };

    const removeFile = (index) => {
        setFiles(files.filter((_, i) => i !== index));
        setPreviews(previews.filter((_, i) => i !== index));
    };

    const handleAddNote = useCallback(() => {
        if (!note.trim() && !files.length) {
            toast.error('Please add a note or attach files');
            return;
        }

        const noteData = {
            text: note,
            files: files.map(file => ({
                name: file.name,
                type: file.type,
                ref: file.ref
            })),
            timestamp: new Date().toISOString()
        };

        // Dispatch to Redux store
        dispatch(addNote({
            userId,
            note: noteData
        }));

        // Clear form
        setNote('');
        setFiles([]);
        toast.success('Note added successfully');
    }, [note, files, userId, dispatch]);

    return (
        <div className="mt-4 space-y-4">
            <div className="space-y-2">
                <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Add a note..."
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows="4"
                />
                
                <div className="flex items-center gap-2">
                    <label className="flex items-center gap-2 cursor-pointer p-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Attach Files
                        <input
                            type="file"
                            onChange={handleFileChange}
                            multiple
                            accept=".jpg,.jpeg,.png,.gif,.pdf,.csv,.docx"
                            className="hidden"
                        />
                    </label>
                    <span className="text-sm text-gray-500">
                        Supported: Images, PDF, CSV, DOCX (max 5MB)
                    </span>
                </div>
            </div>

            {/* File Previews */}
            {previews.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded">
                    {previews.map((preview, index) => (
                        <div key={index} className="relative group">
                            <div className="aspect-square border rounded bg-white p-2 flex flex-col items-center justify-center">
                                {preview.type === 'image' ? (
                                    <img 
                                        src={preview.url} 
                                        alt={preview.name}
                                        className="max-h-full object-contain"
                                    />
                                ) : (
                                    <div className="text-center">
                                        <div className="text-4xl mb-2">
                                            {preview.type === 'PDF' && '📄'}
                                            {preview.type === 'CSV' && '📊'}
                                            {preview.type === 'DOCX' && '📝'}
                                        </div>
                                        <div className="text-sm text-gray-500 truncate max-w-full px-2">
                                            {preview.name}
                                        </div>
                                    </div>
                                )}
                                <button
                                    onClick={() => removeFile(index)}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    ×
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <button 
                onClick={handleAddNote} 
                className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
                Add Note
            </button>
        </div>
    );
};

export default React.memo(UserNotes); 