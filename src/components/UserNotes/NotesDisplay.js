import React from 'react';
import { useSelector } from 'react-redux';
import { getFromCache } from '../../data/uploadsCache';

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

const NotesDisplay = ({ userId }) => {
    const notes = useSelector((state) => {
        console.log('Current state:', state);
        return state.userNotes[userId] || [];
    });

    return (
        <div className="mt-4 space-y-4">
            <h3 className="text-lg font-semibold">Notes History</h3>
            {notes.length === 0 ? (
                <p className="text-gray-500">No notes yet</p>
            ) : (
                <div className="space-y-4">
                    {notes.map((note, index) => (
                        <div key={index} className="p-4 bg-white rounded border">
                            {note.text && (
                                <p className="text-gray-600 mb-3">{note.text}</p>
                            )}
                            {note.files && note.files.length > 0 && (
                                <div className="mt-3">
                                    <h4 className="text-sm font-semibold text-gray-500 mb-2">Attachments:</h4>
                                    <ul className="space-y-2">
                                        {note.files.map((file, fileIndex) => (
                                            <li 
                                                key={fileIndex}
                                                className="flex items-center text-blue-500 hover:text-blue-700 cursor-pointer"
                                                onClick={() => window.open(file.ref, '_blank')}
                                            >
                                                <FileIcon type={file.type} />
                                                <span className="hover:underline">{file.name}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            <p className="text-sm text-gray-400 mt-3">
                                {new Date(note.timestamp).toLocaleString()}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default NotesDisplay; 