import React, { useState, useEffect } from 'react';
import { startBot } from '../services/quizService'; // Assumes you have this function in quizService to start the bot

function AdminDashboard() {
  const [botActive, setBotActive] = useState(false);
  const [question, setQuestion] = useState(null);
  const [intervalId, setIntervalId] = useState(null); // Track interval ID to clear it when stopping the bot

  const handleStartBot = (difficulty) => {
    startBot(difficulty, setQuestion);
    setBotActive(true);

    // Start interval to auto-generate questions at specific times
    const newIntervalId = setInterval(autoStartBot, 60000);
    setIntervalId(newIntervalId);
  };

  const handleStopBot = () => {
    setBotActive(false);
    setQuestion(null);
    if (intervalId) {
      clearInterval(intervalId); // Clear interval to stop auto-generation
      setIntervalId(null);
    }
  };

  const autoStartBot = () => {
    const now = new Date();
    const hours = now.getHours();

    // Check if current time falls within the 08:00-11:00 or 02:00-05:00 range
    if (
      (hours >= 8 && hours < 11) ||  // 08:00 AM to 11:00 AM
      (hours >= 14 && hours < 17)    // 02:00 PM to 05:00 PM
    ) {
      if (!botActive) {
        handleStartBot('hard'); // Start bot with 'hard' difficulty
      }
    }
  };

  useEffect(() => {
    // Run autoStartBot immediately on mount if the bot should be active
    if (botActive) autoStartBot();

    // Cleanup: Stop the bot when the component unmounts
    return () => handleStopBot();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 to-blue-500 flex flex-col items-center justify-center p-8">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-center">
        <h1 className="text-3xl font-semibold text-indigo-700 mb-6">Admin Dashboard</h1>
        
        {/* Start/Stop Bot Section */}
        <div className="space-y-4">
          {!botActive ? (
            <button
              onClick={() => handleStartBot('hard')}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-lg font-semibold"
            >
              Start Bot
            </button>
          ) : (
            <button
              onClick={handleStopBot}
              className="w-full py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg text-lg font-semibold"
            >
              Stop Bot
            </button>
          )}
          
          {/* Bot Status Message */}
          <p className="text-sm text-gray-600">
            {botActive ? 'The bot is now generating questions on the quiz page.' : 'Press "Start Bot" to begin generating questions.'}
          </p>
        </div>

        {/* Display Question */}
        <div className="mt-6 space-y-3">
          {question && (
            <>
              <h2 className="text-xl font-medium text-indigo-700">Current Question:</h2>
              <p className="text-lg text-gray-700">{question.question}</p>
              <div className="mt-3 space-y-2">
                {question.options.map((option, index) => (
                  <button key={index} className="w-full py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600">
                    {option}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Additional Information */}
        <div className="mt-6 space-y-3">
          <h2 className="text-xl font-medium text-indigo-700">Bot Control:</h2>
          <p className="text-sm text-gray-700">
            The bot will automatically generate questions for the GKGS Quiz. The timer for each question will vary depending on its difficulty.
          </p>
          <p className="text-sm text-gray-500">
            Once the bot starts, students will be able to attempt the quiz with real-time feedback.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
