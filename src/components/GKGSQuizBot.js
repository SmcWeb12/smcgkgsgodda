import React, { useState, useEffect } from 'react';

// Import your JSON file with competition-level questions
import competitionQuestions from '../data/competition_questions.json'; // Update path as needed

function GKGSQuizBot() {
  const [subject, setSubject] = useState('gk');
  const [question, setQuestion] = useState(null);
  const [timer, setTimer] = useState(8); // Set timer to 8 seconds
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState([]); // Track answered questions

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
      // Add the current question to answered questions list (and move it to the bottom)
      setAnsweredQuestions((prev) => [...prev, question]);
      loadNewQuestion(); // Load the next question after a short delay
    }, 2000); // 2-second delay to show the correct answer
  };

  const handleAnswer = (option) => {
    setSelectedAnswer(option);
    setShowCorrectAnswer(true); // Show the correct answer immediately
    setTimeout(() => {
      // Add the current question to answered questions list (and move it to the bottom)
      setAnsweredQuestions((prev) => [...prev, question]);
      loadNewQuestion(); // Load the next question after showing the answer
    }, 2000); // 2-second delay to display the correct answer before moving to next
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
        {/* Subject Selection */}
        <select
          className="mb-6 p-2 border rounded-lg bg-gray-50 text-gray-700"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        >
          <option value="gk">सामान्य ज्ञान</option>
          {/* Add more subjects if needed */}
        </select>

        {/* Current Question */}
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {question ? question.question : 'Loading question...'}
          </h1>

          {/* Check if options are available before mapping */}
          {question && question.options && question.options.length > 0 ? (
            <div className="space-y-4">
              {question.options.map((option, index) => {
                let optionClass = "p-3 bg-blue-500 rounded-lg shadow cursor-pointer hover:bg-blue-400 transition-all duration-300";
                // Change color of the option when it's selected or correct
                if (selectedAnswer) {
                  if (option === question.correctAnswer) {
                    optionClass = "p-3 bg-green-600 rounded-lg shadow cursor-pointer"; // Correct answer
                  } else if (option === selectedAnswer && option !== question.correctAnswer) {
                    optionClass = "p-3 bg-red-600 rounded-lg shadow cursor-pointer"; // Incorrect answer
                  }
                }
                return (
                  <label key={index} className={`flex items-center space-x-3 ${optionClass}`}>
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
                );
              })}
            </div>
          ) : (
            <p className="text-red-500">Options are missing for this question. Please try again later.</p>
          )}
        </div>

        {/* Timer */}
        <div className="flex justify-between items-center mt-6">
          <p className="text-gray-600">
            ⏳ शेष समय: <span className="text-blue-600 font-bold">{timer} सेकंड</span>
          </p>
        </div>

        {/* Show Correct Answer */}
        {showCorrectAnswer && question && (
          <div className="mt-6 text-center">
            <h2 className="text-xl font-semibold text-gray-800">सही उत्तर:</h2>
            <p className="text-green-600 font-bold">{question.correctAnswer}</p>
          </div>
        )}
      </div>

      {/* Previously Answered Questions */}
      {answeredQuestions.length > 0 && (
        <div className="mt-8 w-full max-w-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">उत्तरित प्रश्न</h2>
          {answeredQuestions.map((answeredQuestion, index) => (
            <div key={index} className="p-4 bg-gray-200 rounded-lg shadow mb-4">
              <h3 className="font-semibold text-gray-800">{answeredQuestion.question}</h3>
              <p className="text-green-600 font-bold">सही उत्तर: {answeredQuestion.correctAnswer}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GKGSQuizBot;
