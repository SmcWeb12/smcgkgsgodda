// src/components/Home/HomePage.js

import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaPaperPlane } from "react-icons/fa"; // For Send icon

const HomePage = () => {
  const [review, setReview] = useState("");
  const [name, setName] = useState("");
  const [reviews, setReviews] = useState([]); // Store all submitted reviews
  const navigate = useNavigate();

  // Fetch saved reviews from localStorage when component mounts
  useEffect(() => {
    const savedReviews = JSON.parse(localStorage.getItem("reviews")) || [];
    setReviews(savedReviews);

    const timer = setInterval(() => {
      const newReviews = savedReviews.filter((review) => {
        return new Date() - new Date(review.timestamp) <= 5 * 60 * 1000;
      });

      setReviews(newReviews);
      localStorage.setItem("reviews", JSON.stringify(newReviews));
    }, 60000);

    return () => clearInterval(timer); // Cleanup interval on unmount
  }, []);

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmitReview = () => {
    if (name && review) {
      const newReview = {
        name,
        text: review,
        isUser: true,
        timestamp: new Date(),
      };

      const updatedReviews = [...reviews, newReview];
      setReviews(updatedReviews);
      localStorage.setItem("reviews", JSON.stringify(updatedReviews));
      setReview("");
    } else {
      alert("Please provide your name and review.");
    }
  };

  const handleQuizStart = () => {
    navigate("/quiz");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 to-indigo-600">
      <h1 className="text-4xl font-bold text-white mb-4">Welcome to the Math Quiz</h1>
      <p className="mb-6 text-lg text-center text-white">
        Test your math skills! Join our quiz challenge and compete with others.
      </p>
      <ul className="list-disc text-white mb-6 pl-5">
        <li>1-minute timer for each question</li>
        <li>Questions for classes 11th and 12th</li>
        <li>Instant feedback on correct/incorrect answers</li>
      </ul>
      <div className="flex space-x-4 mb-6">
        <button
          onClick={handleQuizStart}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-700"
        >
          Start Quiz
        </button>
        <Link to="/admin-dashboard">
         
        </Link>
      </div>

      {/* Review Section */}
      <div className="mt-6 w-full max-w-md p-4 bg-white shadow-lg rounded-lg space-y-4 h-[90vh]">
        {/* Submitted Reviews Section with Scroll */}
        <div className="space-y-4 h-[65vh] overflow-y-auto bg-gray-50 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-indigo-700">Submitted Reviews:</h4>
          {reviews.map((review, index) => (
            <div
              key={index}
              className={`flex ${review.isUser ? "justify-end" : "justify-start"} space-x-3`}
            >
              <div
                className={`p-3 rounded-2xl max-w-xs break-words shadow-md ${
                  review.isUser
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-gray-800"
                }`}
              >
                <p className="font-semibold">{review.name}</p>
                <p>{review.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Leave a Review Section */}
        <div className="w-full bg-gray-100 p-3 rounded-lg">
          <div className="mb-3">
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={handleNameChange}
              className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center space-x-3">
            <textarea
              placeholder="Type your message..."
              value={review}
              onChange={handleReviewChange}
              className="w-full p-2 border-none rounded-lg resize-none"
              rows="2"
            />
            <button
              onClick={handleSubmitReview}
              className="bg-green-500 text-white rounded-full p-2 hover:bg-green-700"
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
