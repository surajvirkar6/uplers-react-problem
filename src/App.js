import "./App.css";
import React, { useEffect, useState } from "react";

function App() {
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [initialMin, setInitialMin] = useState(0);
  const [initialSec, setInitialSec] = useState(0);

  useEffect(() => {
    let interval;
    if (isActive && (initialMin > 0 || initialSec > 0)) {
      interval = setInterval(() => {
        if (initialSec === 0) {
          if (initialMin === 0) {
            setIsActive(false);
            clearInterval(interval);
          } else {
            setInitialMin((initialMin) => initialMin - 1);
            setInitialSec(59);
          }
        } else {
          setInitialSec((prevSec) => prevSec - 1);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [initialMin, initialSec, isActive]);

  const startTime = () => {
    formatTime(min, sec);
    setIsActive(true);
  };

  const pauseTime = () => {
    setIsActive((isActive) => !isActive);
  };

  const resetTime = () => {
    setMin(0);
    setSec(0);
    setIsActive(false);
    setInitialMin(0);
    setInitialSec(0);
  };

  const formatTime = (min, sec) => {
    let totalSeconds = Number(min * 60) + Number(sec);
    setInitialMin(Math.floor(totalSeconds / 60));
    setInitialSec(totalSeconds % 60);
  };

  return (
    <div className="App">
      <input
        type="number"
        value={min}
        onChange={(event) => setMin(event.target.value)}
        min={0}
      />
      Minutes
      <br />
      <input
        type="number"
        value={sec}
        onChange={(event) => setSec(event.target.value)}
        min={0}
      />
      Seconds
      <br />
      <br />
      <button onClick={startTime}>Start</button>
      <button onClick={pauseTime}>Pause / Resume</button>
      <button onClick={resetTime}>Reset</button>
      <h1>{`${initialMin < 10 ? "0" + initialMin : initialMin}:${
        initialSec < 10 ? "0" + initialSec : initialSec
      }`}</h1>
    </div>
  );
}

export default App;
