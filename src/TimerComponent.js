import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faUndo, faGears } from '@fortawesome/free-solid-svg-icons';

function TimerComponent() {
  const [time, setTime] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [customTime, setCustomTime] = useState(25); 
  const [selectedTimer, setSelectedTimer] = useState(25);

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

  const handleTimerChange = (event) => {
    const selectedValue = parseInt(event.target.value);
    setTimer(selectedValue);
    setSelectedTimer(selectedValue);
  };

  return (
    <div className="timer-container">
      <navbar>
        <h1>Pomodoro Timer</h1>
      </navbar>

      <div className="timer-buttons">
      <select value={selectedTimer} onChange={handleTimerChange}>
          <option value={25}>Pomodoro (25 min)</option>
          <option value={5}>Short Break (5 min)</option>
          <option value={15}>Long Break (15 min)</option>
        </select>
      </div>

      <div className="timer">{formatTime(time)}</div>
      <div className="timer-buttons">
      <button className="start-button" onClick={startTimer}>
        <FontAwesomeIcon icon={faPlay} /> 
      </button>

      <button className="pause-button" onClick={pauseTimer}>
        <FontAwesomeIcon icon={faPause} /> 
      </button>

      <button className="reset-button" onClick={resetTimer}>
        <FontAwesomeIcon icon={faUndo} /> 
      </button>
      <button className="settings-button" onClick={toggleSettings}>
      <FontAwesomeIcon icon={faGears} /> 
      </button>

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
