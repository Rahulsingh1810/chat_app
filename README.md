### README for Cosmic Talks Chat Application  

---

# Cosmic Talks 🌌💬  

**Cosmic Talks** is a feature-rich chat application built on the MERN stack. With real-time messaging, media sharing, and AI-powered support, it provides a modern communication platform tailored to enhance user interaction.  

---

## Features  

- **Real-Time Chatting**: Instant messaging with a seamless experience.  
- **Media Sharing**: Upload and share images, videos, and files securely using **Cloudinary**.  
- **AI Support**: Get intelligent assistance powered by AI to answer queries, suggest responses, or provide useful information during conversations.  
- **User Authentication**: Secure login and signup using JWT.  
- **Responsive Design**: Optimized for desktop and mobile devices.  
- **Search Functionality**: Quickly find messages, media, or users.  

---

## Tech Stack  

- **Frontend**:  
  - React.js (with Redux for state management)  
  - Styled Components/SCSS for UI design  

- **Backend**:  
  - Node.js with Express  
  - WebSocket/Socket.io for real-time communication  

- **Database**:  
  - MongoDB  

- **Cloud Storage**:  
  - Cloudinary for secure and scalable media hosting  

- **AI Integration**:  
  - gemini api for integrated ai features  

---

## Installation  

1. **Clone the Repository**:  
   ```bash  
   git clone https://github.com/Rahulsingh1810/chat_app.git  
   cd chat_app  
   ```  

2. **Install Dependencies**:  
   ```bash  
   npm install  
   cd client  
   npm install  
   cd ../server  
   npm install  
   ```  

3. **Set Up Environment Variables**:  
   Create a `.env` file in both the `client` and `server` directories with the following:  

   **Server**:  
   ```bash  
   PORT=5000  
   MONGO_URI=your_mongodb_connection_string  
   CLOUDINARY_NAME=your_cloudinary_name  
   CLOUDINARY_API_KEY=your_cloudinary_api_key  
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret  
   OPENAI_API_KEY=your_openai_api_key  
   ```  

   **Client**:  
   ```bash  
   REACT_APP_API_URL=http://localhost:5000  
   REACT_APP_SOCKET_URL=http://localhost:5000  
   ```  

4. **Run the Application**:  
   - Start the backend server:  
     ```bash  
     cd server  
     npm start  
     ```  
   - Start the frontend:  
     ```bash  
     cd client  
     npm start  
     ```  

5. **Access the App**:  
   Open your browser and navigate to `http://localhost:3000`.  

---

## Contributing  

We welcome contributions to improve **Cosmic Talks**! To contribute:  
1. Fork the repository.  
2. Create a feature branch:  
   ```bash  
   git checkout -b feature-name  
   ```  
3. Commit your changes:  
   ```bash  
   git commit -m "Add feature-name"  
   ```  
4. Push the branch:  
   ```bash  
   git push origin feature-name  
   ```  
5. Submit a pull request.  

---

## License  

This project is licensed under the Rahul kumar Singh.  

---

## Contact  

For support or feedback, email us at rahul181002singh@gmail.com.  

Happy Chatting! 🚀  
