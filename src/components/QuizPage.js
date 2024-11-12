import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

const QuizPage = () => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    // Fetch a question from Firestore
    const fetchQuestion = () => {
      const questionRef = firebase.firestore().collection('questions').orderBy('timestamp').limit(1);
      questionRef.get()
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            setQuestion(doc.data().question);
            setOptions(doc.data().options);
          }
        })
        .catch((error) => {
          console.error('Error fetching question: ', error);
        });
    };

    fetchQuestion();  // Fetch the question when the component mounts

  }, []);

  const handleAnswerSubmit = () => {
    // Check if the selected answer is correct
    const correctAnswer = options.find(option => option === question.correct_answer);
    if (selectedOption === correctAnswer) {
      alert('Correct Answer!');
    } else {
      alert('Wrong Answer!');
    }
  };

  return (
    <div className="quiz-container">
      <h2>{question}</h2>
      {options.map((option, index) => (
        <div key={index} className="option">
          <input
            type="radio"
            id={option}
            name="answer"
            value={option}
            onChange={(e) => setSelectedOption(e.target.value)}
          />
          <label htmlFor={option}>{option}</label>
        </div>
      ))}
      <button onClick={handleAnswerSubmit}>Submit Answer</button>
    </div>
  );
};

export default QuizPage;
