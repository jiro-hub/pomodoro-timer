import React, { useState, useEffect } from 'react';

function Timer({ sessionType, time, isRunning, onSessionComplete }) {
    const [currentTime, setCurrentTime] = useState(time);

    useEffect(() => {
        setCurrentTime(time); // Sync with parent timer when time changes
    }, [time]);

    useEffect(() => {
        if (!isRunning) return;

        const timer = setInterval(() => {
            setCurrentTime((prevTime) => {
                if (prevTime <= 0) {
                    clearInterval(timer);
                    onSessionComplete(); // Notify parent when timer ends
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isRunning, onSessionComplete]);

    return (
        <div>
            <h2>{sessionType === 'Work' ? 'Work' : 'On Break'}</h2>
            <p>
                {Math.floor(currentTime / 60)}:
                {String(currentTime % 60).padStart(2, '0')}
            </p>
        </div>
    );
}

export default Timer;
