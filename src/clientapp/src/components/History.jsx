import React from 'react';

function History({ sessions }) {
    return (
        <div>
            <h2>Session History</h2>
            <ul>
                {sessions.map((session, index) => (
                    <li key={index}>
                        <strong>Session:</strong> {session.SessionType} |
                        <strong> Start:</strong> {session.StartTime || 'N/A'} |
                        <strong> End:</strong> {session.EndTime || 'N/A'}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default History;
