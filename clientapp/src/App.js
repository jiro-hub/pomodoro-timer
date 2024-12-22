import React, { useState, useEffect } from 'react';
import Timer from './Timer';
import History from './History';
import './App.css';

function App() {
    const [sessions, setSessions] = useState([]);
    const [sessionType, setSessionType] = useState('Work');

    const handleSessionComplete = (session) => {
        setSessions([...sessions, session]);
        setSessionType(session.SessionType === 'Work' ? 'Break' : 'Work');
    };

    return (
        <div className="app-container">
            <h1>🌸 Pomodoro Timer 🌸</h1>
            <Timer
                sessionType={sessionType}
                onSessionComplete={handleSessionComplete}
            />
            <History sessions={sessions} />
        </div>
    );
}

export default App;
