import React from 'react';
import ModalHeader from '../common/ModalHeader';
import ModalContainer from '../common/ModalContainer';
import UserNotes from '../UserNotes/UserNotes';

const UserModal = ({ user, onClose }) => {
    if (!user) return null;

    const aiInsights = [
        {
            line1: "High engagement user with consistent platform activity.",
            line2: "Recommend premium features based on usage patterns and professional background."
        },
        {
            line1: "Shows interest in collaborative features and data visualization.",
            line2: "Consider promoting team-based analytics tools and advanced reporting options."
        },
        {
            line1: "Regular business hours access pattern suggests professional use.",
            line2: "Potential candidate for enterprise solution upsell and custom support."
        },
        {
            line1: "Demonstrates strong analytical skills through feature usage.",
            line2: "May benefit from advanced data modeling and automation capabilities."
        },
        {
            line1: "Active in data export and sharing functionalities.",
            line2: "Good fit for upcoming collaborative features and integration tools."
        }
    ];

    const randomInsight = aiInsights[Math.floor(Math.random() * aiInsights.length)];
    const status = user[8]; // Get status from user data

    const getStatusColor = (status) => {
        return status === 'Active' 
            ? 'bg-green-100 text-green-800 border-green-200'
            : 'bg-red-100 text-red-800 border-red-200';
    };

    const copyUserDetails = () => {
        const userDetails = `
            Name: ${user[0]}
            Age: ${user[1]}
            Occupation: ${user[2]}
            Hobby: ${user[3]}
            Favorite Color: ${user[4]}
            Pet: ${user[5]}
            Email: ${user[6]}
            CLV: ${user[7]}
            Status: ${user[8]}
        `;
        navigator.clipboard.writeText(userDetails.trim()).then(() => {
            alert('User details copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    };

    const copyUserLink = () => {
        const userLink = `https://example.com/user/${user[0]}`;
        navigator.clipboard.writeText(userLink).then(() => {
            alert('User link copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    };

    const userId = user[0]; // Assuming user ID is the first element

    return (
        <ModalContainer onClose={onClose}>
            <ModalHeader title="User Details" onClose={onClose} />
            <div className="flex-1 overflow-y-auto p-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-2 border rounded">
                        <p><strong>Name:</strong> {user[0]}</p>
                        <p><strong>Age:</strong> {user[1]}</p>
                        <p><strong>Occupation:</strong> {user[2]}</p>
                    </div>
                    <div className="p-2 border rounded">
                        <p><strong>Hobby:</strong> {user[3]}</p>
                        <p><strong>Favorite Color:</strong> {user[4]}</p>
                        <p><strong>Pet:</strong> {user[5]}</p>
                    </div>
                    <div className="p-2 border rounded">
                        <p><strong>Email:</strong> {user[6]}</p>
                        <p><strong>CLV:</strong> {user[7]}</p>
                        <div className="mt-2">
                            <span className={`px-3 py-1 rounded-full border ${getStatusColor(status)}`}>
                                {status}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="mt-4 flex gap-2">
                    <button onClick={copyUserDetails} className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Copy User Details</button>
                    <button onClick={copyUserLink} className="p-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-100">Copy User Link</button>
                </div>
                <div className="mt-4 p-4 bg-gray-50 rounded border">
                    <h3 className="text-xl font-semibold mb-2">AI Recommendation</h3>
                    <p className="text-gray-600 mb-2">{randomInsight.line1}</p>
                    <p className="text-gray-600">{randomInsight.line2}</p>
                </div>
                <UserNotes userId={userId} />
            </div>
        </ModalContainer>
    );
};

export default UserModal; 