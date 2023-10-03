import React, { useState, useEffect } from 'react';

function TimerComponent() {
  const [time, setTime] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [customTime, setCustomTime] = useState(25); 

  useEffect(() => {
    let timer;

    if (isRunning) {
      timer = setInterval(() => {
        if (time > 0) {
          setTime((prevTime) => prevTime - 1);
        } else {
          clearInterval(timer);
          setIsRunning(false);
        }
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [isRunning, time]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setTime(1500);
    setIsRunning(false);
  };

  const setTimer = (minutes) => {
    setTime(minutes * 60);
    setCustomTime(minutes);
    setIsRunning(false);
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  return (
    <div className="timer-container">
      <navbar>
        <h1>Pomodoro Timer</h1>
        <hr className="separator" />
        <button className="settings-button" onClick={toggleSettings}>
          ⚙️
        </button>
      </navbar>

      <div className="timer-buttons">
        <button onClick={() => setTimer(25)}>Pomodoro (25 min)</button>
        <button onClick={() => setTimer(5)}>Short Break (5 min)</button>
        <button onClick={() => setTimer(15)}>Long Break (15 min)</button>
      </div>

      <div className="timer">{formatTime(time)}</div>
      <div className="timer-buttons">
        <button onClick={startTimer}>Start</button>
        <button onClick={pauseTimer}>Pause</button>
        <button onClick={resetTimer}>Reset</button>
      </div>

      {showSettings && (
        <div className="settings-modal">
          <h2>Imposta il timer desiderato</h2>
          <input
            type="number"
            value={customTime}
            onChange={(e) => setCustomTime(parseInt(e.target.value))}
          />
          <button
            className="confirm-button"
            onClick={() => setTimer(customTime)}
          >
            Conferma
          </button>
          <button className="close-button" onClick={toggleSettings}>
            Chiudi
          </button>
        </div>
      )}
    </div>
  );
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

export default TimerComponent;
