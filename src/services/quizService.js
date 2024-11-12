import axios from 'axios';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getApp } from 'firebase/app';

const API_KEY = 'YOUR_GOOGLE_TRANSLATE_API_KEY'; // Replace with your Google Translate API key
const db = getFirestore(getApp());

// Function to translate text to Hindi using Google Translate API
const translateText = async (text) => {
  const url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;
  
  try {
    const response = await axios.post(url, {
      q: text,
      target: 'hi', // Hindi language
    });
    if (response.data && response.data.data && response.data.data.translations) {
      return response.data.data.translations[0].translatedText;
    }
    return text; // If translation fails, return original text
  } catch (error) {
    console.error('Translation error:', error);
    return text; // If there's an error, return original text
  }
};

// Function to start the quiz bot based on subject and difficulty
export const startBot = async (subject, difficulty, setQuestion, setTimer) => {
  let categoryId;

  // Set categoryId based on the subject
  switch(subject) {
    case 'gk': categoryId = 9; break;
    case 'gs': categoryId = 22; break;
    case 'physics': categoryId = 17; break;
    case 'gkgs': categoryId = 18; break;
    case 'chemistry': categoryId = 19; break;
    case 'math_jac': categoryId = 27; break;
    default: categoryId = 9; // Default to General Knowledge
  }

  // API URL to fetch questions
  const url = `https://opentdb.com/api.php?amount=1&difficulty=${difficulty}&category=${categoryId}&type=multiple&language=hi`;

  try {
    const response = await axios.get(url);
    const questionData = response.data.results[0];

    // Combine correct and incorrect answers
    const options = [...questionData.incorrect_answers, questionData.correct_answer];
    const randomOptions = shuffle(options); // Shuffle the options randomly

    // No need to translate questions and options if API directly gives Hindi
    const translatedQuestion = questionData.question;  // Already in Hindi
    const translatedOptions = randomOptions; // Already in Hindi

    // Update state with the new question and options
    setQuestion({
      question: translatedQuestion,
      options: translatedOptions,
      correctAnswer: questionData.correct_answer,
    });

    // Set timer (you can adjust the timer as needed)
    setTimer(8); // Timer set to 8 seconds for this example
  } catch (error) {
    console.error('Error fetching question:', error);
  }
};

// Helper function to shuffle the options randomly
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
};

// Function to store questions in Firebase Firestore (if needed)
const storeQuestionInFirebase = (question, options) => {
  const timestamp = Date.now(); // Get current timestamp
  const questionRef = doc(db, 'questions', `${timestamp}`);
  setDoc(questionRef, {
    question: question,
    options: options,
    timestamp: timestamp
  });
};
