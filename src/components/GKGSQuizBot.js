import React, { useState, useEffect } from 'react';

// Import your JSON file with competition-level questions
import competitionQuestions from '../data/competition_questions.json'; // अपडेटेड पथ

function GKGSQuizBot() {
  const [subject, setSubject] = useState('gk');
  const [question, setQuestion] = useState(null);
  const [timer, setTimer] = useState(8); // Set timer to 8 seconds
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

  // Load the competition-level questions
  useEffect(() => {
    loadNewQuestion();
  }, [subject]);

  useEffect(() => {
    // Timer to count down and trigger answer reveal
    if (question) {
      const countdown = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            revealAnswer(); // Show correct answer
            clearInterval(countdown);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(countdown);
    }
  }, [question]);

  const loadNewQuestion = () => {
    setSelectedAnswer(null);
    setShowCorrectAnswer(false);
    setTimer(8); // Reset timer to 8 seconds for each new question

    // Get random question from the competition questions array
    const randomQuestion = competitionQuestions[Math.floor(Math.random() * competitionQuestions.length)];
    setQuestion(randomQuestion);
  };

  const revealAnswer = () => {
    setShowCorrectAnswer(true);
    setTimeout(() => {
      loadNewQuestion(); // Load the next question after a short delay
    }, 2000); // 2-second delay to show the correct answer
  };

  const handleAnswer = (option) => {
    setSelectedAnswer(option);
    setShowCorrectAnswer(true); // Show the correct answer immediately
    setTimeout(() => {
      loadNewQuestion(); // Load the next question after showing the answer
    }, 2000); // 2-second delay to display the correct answer before moving to next
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
        <select
          className="mb-4 p-2 border rounded"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        >
          <option value="gk">सामान्य ज्ञान</option>
          
        </select>

        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          {question ? question.question : 'Loading question...'}
        </h1>

        {question && (
          <div className="space-y-4">
            {question.options.map((option, index) => (
              <label key={index} className="flex items-center space-x-3 p-2 bg-blue-8 rounded-md shadow cursor-pointer">
                <input
                  type="radio"
                  name="answer"
                  value={option}
                  className="form-radio h-8 w-8 text-blue-500"
                  onChange={() => handleAnswer(option)}
                  checked={selectedAnswer === option}
                  disabled={selectedAnswer !== null} // Disable after selecting an option
                />
                <span className={`text-gray-700 ${showCorrectAnswer && option === question.correctAnswer ? 'text-green-600 font-bold' : ''}`}>
                  {option}
                </span>
              </label>
            ))}
          </div>
        )}

        <div className="flex justify-between items-center mt-6">
          <p className="text-gray-600">
            ⏳ शेष समय: <span className="text-blue-600 font-bold">{timer} सेकंड</span>
          </p>
        </div>

        {showCorrectAnswer && question && (
          <div className="mt-6 text-center">
            <h2 className="text-xl font-semibold text-gray-800">सही उत्तर:</h2>
            <p className="text-green-600 font-bold">{question.correctAnswer}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default GKGSQuizBot;
