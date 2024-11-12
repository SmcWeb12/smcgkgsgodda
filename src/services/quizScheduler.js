// src/services/quizScheduler.js
import { startBot } from './quizService';

// Define the time slots and subject mapping
const timeBasedQuestions = [
  { time: '08:00:00', subject: 'gk', difficulty: 'easy' },
  { time: '09:00:00', subject: 'gs', difficulty: 'easy' },
  { time: '10:00:00', subject: 'physics', difficulty: 'hard' },
  { time: '16:00:00', subject: 'gkgs', difficulty: 'hard' },
  { time: '17:00:00', subject: 'chemistry', difficulty: 'hard' },
  { time: '18:00:00', subject: 'math jac', difficulty: 'hard' }
];

// Schedule the questions to be fetched at the specified time slots
export const scheduleQuestions = () => {
  timeBasedQuestions.forEach((timeSlot) => {
    const [hours, minutes, seconds] = timeSlot.time.split(':');
    const now = new Date();
    const targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, seconds);
    
    const delay = targetTime - now;
    if (delay > 0) {
      setTimeout(() => {
        // Start the bot with the respective subject
        startBot(timeSlot.subject, timeSlot.difficulty); 
      }, delay);
    }
  });
};
