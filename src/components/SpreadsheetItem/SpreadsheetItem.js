import React from 'react';

const SpreadsheetItem = ({ selectedUser }) => {
    const handleCopyLink = () => {
        if (selectedUser) {
            const link = `${window.location.origin}/user/${selectedUser[0]}`;
            navigator.clipboard.writeText(link);
            alert('Link copied to clipboard!');
        }
    };

    if (!selectedUser) {
        return <p>Select a user from the table or adjust filters to refine the list and click a user to view details.</p>;
    }

    return (
        <div className="bg-white shadow-md rounded-lg p-4 mt-4 border border-blue-200">
            <h3>User Details</h3>
            <p>Name: {selectedUser[0]}</p>
            <p>Age: {selectedUser[1]}</p>
            <p>Occupation: {selectedUser[2]}</p>
            {selectedUser[3] && <p>Hobby: {selectedUser[3]}</p>}
            {selectedUser[4] && <p>Favorite Color: {selectedUser[4]}</p>}
            {selectedUser[5] && <p>Pet: {selectedUser[5]}</p>}
            <p>Email: {selectedUser[6]}</p>
            <p>Customer Lifetime Value: ${selectedUser[7]}</p>
            <button onClick={handleCopyLink} className="mt-2 bg-blue-500 text-white p-2 rounded">Copy Link</button>
        </div>
    );
};

export default SpreadsheetItem; 