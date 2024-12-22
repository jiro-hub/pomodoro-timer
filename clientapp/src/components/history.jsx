import React from 'react';

function History({ sessions }) {
    return (
        <div className="history">
            <h2>Session History 📜</h2>
            <ul>
                {sessions.map((session) => (
                    <li key={session.Id}>
                        {session.SessionType} Session - {session.StartTime.toLocaleTimeString()} to {session.EndTime.toLocaleTimeString()}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default History;
