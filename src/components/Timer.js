// src/components/Timer.js
import React, { useEffect, useState } from 'react';

const Timer = ({ difficulty, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(difficulty === 'hard' ? 10 : 5);

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 1) {
          clearInterval(timerId);
          onTimeUp(); // Notify parent when time is up
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [difficulty, onTimeUp]);

  return (
    <div className="timer">
      <h2 className="text-xl font-bold">{timeLeft} Seconds Left</h2>
    </div>
  );
};

export default Timer;
