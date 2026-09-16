# SnipAI: Intelligent Code Knowledge Base

**Live Demo:** [Insert Your Vercel Link Here]
**Backend API:** [https://snipai.onrender.com](https://snipai.onrender.com)

SnipAI is a full-stack MERN application designed with a minimalist, high-contrast monochrome interface. It allows developers to store, organize, and understand complex code snippets using Google's Generative AI models.

## Project Architecture and Implementation

### Frontend (React and Vite)
- **State Management:** Utilized React Context API for global authentication state management.
- **Routing:** Implemented React Router with protected routes to prevent unauthenticated access to the dashboard and editor.
- **UI/UX Design:** Engineered a responsive, minimalist monochrome aesthetic using Tailwind CSS.
- **Code Editor Integration:** Integrated @monaco-editor/react to provide an industry-standard editing experience with syntax highlighting.

### Backend (Node.js and Express)
- **RESTful API:** Developed a robust Express API with modular routing for authentication and snippet management.
- **Authentication:** Secured user accounts using bcrypt for password hashing and JSON Web Tokens (JWT) for stateless session management.
- **Database:** Designed Mongoose schemas with indexing for optimized query performance on MongoDB Atlas.
- **AI Integration:** Implemented the @google/generative-ai SDK, specifically utilizing the gemini-flash-latest model to dynamically analyze and explain user code snippets. Included robust error handling for API rate limits and service unavailability.

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas Account
- Google Gemini API Key

### Local Installation
1. Clone the repository and navigate to the project directory.
2. Initialize the backend:
   ```bash
   cd backend
   npm install
   ```
3. Create a .env file in the backend directory with the following variables:
   ```
   PORT=5001
   MONGO_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_secure_jwt_secret
   GEMINI_API_KEY=your_gemini_api_key
   ```
4. Start the backend server:
   ```bash
   node server.js
   ```
5. Initialize the frontend in a separate terminal:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Deployment Architecture
- **Frontend Hosting:** Deployed via Vercel for optimized global edge delivery.
- **Backend API:** Hosted on Render as a Node.js web service.
- **Database:** Hosted on MongoDB Atlas cloud infrastructure.
