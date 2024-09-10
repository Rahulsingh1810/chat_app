import React from 'react'
import axios from 'axios'

const Gemini = () => {

  const generateAnswer = async () => {
    try {
      console.log("loading...");
      const API_KEY = process.env.REACT_APP_API_KEY; 
      
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`,
        method: "post",
        data: {
          "contents": [
            {
              "role": "user",
              "parts": [{ "text": "Give me five subcategories of jazz?" }]
            }
          ]
        }
      });

      console.log(response.data);  
    } catch (error) {
      console.error("Error generating response:", error);
    }
  }

  return (
    <div>
      <button onClick={generateAnswer}>Generate Answer</button>
    </div>
  )
}

export default Gemini;
