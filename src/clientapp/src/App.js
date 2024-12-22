import React, { useState, useEffect } from 'react';
import Timer from './components/Timer';
import Popup from './components/popup';
import History from './components/History';
import './App.css';

function App() {
    const [sessionType, setSessionType] = useState('Work'); // 'Work' or 'Break'
    const [isRunning, setIsRunning] = useState(false); // Timer is running or not
    const [time, setTime] = useState(1500); // Default 25 minutes (1500 seconds)
    const [customTime, setCustomTime] = useState(25); // Custom work time in minutes
    const [breakDuration, setBreakDuration] = useState(5); // Default break time in minutes
    const [popupMessage, setPopupMessage] = useState(''); // Message for popup
    const [showPopup, setShowPopup] = useState(false); // Show/hide popup
    const [sessionHistory, setSessionHistory] = useState([]); // Store session details
    const [sessionStartTime, setSessionStartTime] = useState(null); // Track session start time
    const [remainingTime, setRemainingTime] = useState(null); // Store remaining time for resumption
    const [showSessionHistory, setShowSessionHistory] = useState(false); // Toggle session history

    // Load session history from localStorage when the app starts
    useEffect(() => {
        const savedHistory = localStorage.getItem('sessionHistory');
        if (savedHistory) {
            setSessionHistory(JSON.parse(savedHistory));
        }
    }, []);

    // Save session history to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('sessionHistory', JSON.stringify(sessionHistory));
    }, [sessionHistory]);

    // Start Timer
    const handleStart = () => {
        setIsRunning(true);
        setSessionType('Work');
        setSessionStartTime(new Date().toLocaleTimeString()); // Record session start time

        if (remainingTime !== null) {
            setTime(remainingTime);
            setRemainingTime(null); // Clear remaining time after resuming
        } else {
            setTime(customTime * 60); // Start fresh if no remaining time
        }
    };

    // Take a Break and Save Remaining Time
    const handleBreak = () => {
        setPopupMessage('Take a break! It’s okay to relax and recharge (๑•̀ㅂ•́) و✧');
        setShowPopup(true);
        setIsRunning(true);
        setSessionType('Break');
        setRemainingTime(time); // Save the remaining time
        setTime(breakDuration * 60); // Set break time dynamically
        setSessionStartTime(new Date().toLocaleTimeString()); // Record break start time
    };

    // End Session and Reset Timer
    const handleEndSession = () => {
        setPopupMessage('🎉 Great job! You’ve completed your session ~(≧▽≦)/~');
        setShowPopup(true);
        setIsRunning(false);
        setSessionType('Work');
        setTime(customTime * 60); // Reset to default custom work time
        setRemainingTime(null); // Clear remaining time

        // Add session details to history
        const newSession = {
            SessionType: sessionType,
            StartTime: sessionStartTime || new Date().toLocaleTimeString(),
            EndTime: new Date().toLocaleTimeString(),
        };
        setSessionHistory([...sessionHistory, newSession]);
        setSessionStartTime(null); // Reset start time for the next session
    };

    // Handle Session Completion
    const onSessionComplete = () => {
        if (sessionType === 'Break') {
            setPopupMessage('Break is over! Back to your work session 💪');
            setShowPopup(true);
            setSessionType('Work');
            setTime(remainingTime || customTime * 60); // Resume previous work session or reset
            setRemainingTime(null); // Clear saved remaining time
            setIsRunning(true);
        } else {
            handleEndSession();
        }
    };

    // Toggle Session History
    const toggleSessionHistory = () => {
        setShowSessionHistory(!showSessionHistory);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    return (
        <div className="app-container">
            <h1>🌸 Pomodoro Timer 🌸</h1>

            <div className="timer-controls">
                <Timer
                    sessionType={sessionType}
                    time={time}
                    isRunning={isRunning}
                    onSessionComplete={onSessionComplete}
                />
                <div className="timer-buttons">
                    <button onClick={handleStart}>Start</button>
                    <button onClick={handleBreak}>Break ({breakDuration} min)</button>
                    <button onClick={handleEndSession}>End Session</button>
                    <button onClick={toggleSessionHistory}>
                        {showSessionHistory ? 'Hide Session History' : 'Show Session History'}
                    </button>
                </div>
            </div>

            {showSessionHistory && (
                <div className="session-history">
                    <h3>📜 Session History</h3>
                    {sessionHistory.length > 0 ? (
                        <ul>
                            {sessionHistory.map((session, index) => (
                                <li key={index}>
                                    <strong>Type:</strong> {session.SessionType} |
                                    <strong> Start:</strong> {session.StartTime} |
                                    <strong> End:</strong> {session.EndTime}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No session history available yet.</p>
                    )}
                </div>
            )}

            <div className="time-selector">
                <label>Custom Work Timer (in minutes): </label>
                <input
                    type="number"
                    min="1"
                    max="60"
                    value={customTime}
                    onChange={(e) => setCustomTime(Number(e.target.value))}
                />
            </div>

            <div className="break-selector">
                <label>Break Duration: </label>
                <select value={breakDuration} onChange={(e) => setBreakDuration(Number(e.target.value))}>
                    <option value={5}>5 minutes</option>
                    <option value={10}>10 minutes</option>
                    <option value={15}>15 minutes</option>
                    <option value={20}>20 minutes</option>
                </select>
            </div>

            {showPopup && <Popup message={popupMessage} onClose={closePopup} />}
        </div>
    );
}

export default App;
