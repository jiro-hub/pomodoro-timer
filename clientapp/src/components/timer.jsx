import React, { useState, useEffect } from 'react';

function Timer({ sessionType, onSessionComplete }) {
    const [timeLeft, setTimeLeft] = useState(sessionType === 'Work' ? 25 * 60 : 5 * 60);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        if (isRunning) {
            const timer = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev === 1) {
                        onSessionComplete({
                            Id: Date.now(),
                            StartTime: new Date(),
                            EndTime: new Date(new Date().getTime() + prev * 1000),
                            SessionType: sessionType,
                        });
                        setIsRunning(false);
                        return sessionType === 'Work' ? 5 * 60 : 25 * 60;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [isRunning, sessionType, onSessionComplete]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="timer">
            <h2>{sessionType} Session</h2>
            <div className="time-display">{formatTime(timeLeft)}</div>
            <div className="controls">
                <button onClick={() => setIsRunning(!isRunning)}>
                    {isRunning ? 'Pause' : 'Start'}
                </button>
                <button onClick={() => setTimeLeft(sessionType === 'Work' ? 25 * 60 : 5 * 60)}>
                    Reset
                </button>
            </div>
        </div>
    );
}

export default Timer;
