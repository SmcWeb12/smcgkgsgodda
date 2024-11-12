// src/components/Home/HomePage.js

import React, { useState } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [review, setReview] = useState("");
  const [name, setName] = useState("");

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmitReview = () => {
    if (name && review) {
      alert(`Thank you for your review, ${name}!`);
      setName("");
      setReview("");
    } else {
      alert("Please provide your name and review.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 to-indigo-600">
      {/* Heading Section */}
      <h1 className="text-4xl font-bold text-white mb-4">Welcome to the SMC_Godda_GK_GS_Quiz</h1>
      <p className="mb-6 text-lg text-center text-white">
        Test your math skills! Join our quiz challenge and compete with others. Here are some features:
      </p>

      {/* Feature List */}
      <ul className="list-disc text-white mb-6 pl-5">
        <li>Timed questions with 1-minute per question</li>
        <li>Questions for classes 11th and 12th</li>
        <li>Instant feedback with correct/incorrect answers</li>
      </ul>

      {/* Buttons for Login and Admin */}
      <div className="flex space-x-4 mb-6">
        <Link to="/login">
          <button className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-700">
            Login to Start Quiz
          </button>
        </Link>
        <Link to="/admin-dashboard">
          <button className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-700">
            Admin Dashboard
          </button>
        </Link>
      </div>

      {/* Review Section */}
      <div className="mt-6 w-full max-w-md p-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Leave a Review</h2>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={handleNameChange}
          className="w-full p-2 mb-3 border border-gray-300 rounded"
        />
        <textarea
          placeholder="Your Review"
          value={review}
          onChange={handleReviewChange}
          className="w-full p-2 mb-3 border border-gray-300 rounded"
          rows="4"
        />
        <button
          onClick={handleSubmitReview}
          className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-700"
        >
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default HomePage;
