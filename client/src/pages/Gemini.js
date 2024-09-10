import React, { useState } from 'react';
import axios from 'axios';
import bgVideo from '../assets/bgvideo/bgvdo.mp4';  // Adjust the path if needed

const Gemini = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const generateAnswer = async () => {
    if (!question) {
      alert("Please enter a question");
      return;
    }

    setLoading(true);
    setAnswer('');
    try {
      const API_KEY = process.env.REACT_APP_API_KEY;

      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`,
        {
          contents: [
            {
              role: "user",
              parts: [{ text: question }]
            }
          ]
        }
      );

      // Log the response for debugging
      console.log("API Response:", response);

      // Extract the generated content from the API response
      const generatedContent = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No content available"; 
      setAnswer(generatedContent);
    } catch (error) {
      console.error("Error generating response:", error);
      setAnswer("Failed to generate response. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gray-900">
      <video 
        className="absolute top-0 left-0 w-full h-full object-cover z-0" 
        autoPlay 
        loop 
        muted 
        playsInline
      >
        <source src={bgVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="relative bg-white bg-opacity-60 w-full max-w-lg mx-4 md:mx-8 lg:mx-16 xl:mx-auto rounded-lg shadow-lg p-4 md:p-6 lg:p-8 z-10">
        <h1 className="text-xl md:text-2xl font-semibold mb-4 text-gray-700">Ask Gemini AI</h1>

        {/* Input field for user's question */}
        <input 
          type="text" 
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type your question here..." 
          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 bg-white bg-opacity-80 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        />

        {/* Button to generate the answer */}
        <button 
          onClick={generateAnswer} 
          disabled={loading}
          className={`w-full px-4 py-2 text-white font-semibold rounded-md ${
            loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          } transition duration-200`}
        >
          {loading ? "Generating..." : "Get Answer"}
        </button>

        {/* Display the generated response */}
        {answer && (
          <div className="mt-4 p-3 bg-gray-100 bg-opacity-80 rounded-lg">
            <h2 className="font-semibold text-gray-600 text-lg">Response:</h2>
            <p className="text-gray-700 mt-2">{answer}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gemini;
