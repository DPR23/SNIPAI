#  SnipAI
> A minimalist, AI-powered knowledge base for developers.

![SnipAI Banner](https://via.placeholder.com/1000x300/000000/FFFFFF?text=SnipAI+-+Code+Smarter)

SnipAI is a full-stack MERN application designed with a sleek, Apple-inspired monochrome interface. It allows developers to store, organize, and understand complex code snippets using Google's Gemini AI.

## ✨ Features
* **Minimalist UI/UX:** A distraction-free, high-contrast monochrome design with rounded corners and beautiful typography.
* **Intelligent AI Tutor:** Integrated with Google Gemini to explain algorithms and break down complex logic.
* **Monaco Editor:** Industry-standard code editing experience (powered by the same engine as VS Code).
* **Robust Authentication:** Secure JWT-based login and registration.
* **Lightning Fast Search:** Instantly filter snippets by title, tags, or programming language.

## 🛠️ Tech Stack
* **Frontend:** React 18, Vite, Tailwind CSS v4, Lucide Icons, Monaco Editor.
* **Backend:** Node.js, Express.js, JSON Web Tokens (JWT), Google Generative AI SDK.
* **Database:** MongoDB, Mongoose.

## 🚀 Getting Started

### Prerequisites
* Node.js (v18+)
* MongoDB (Local or Atlas)
* Google Gemini API Key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/snipai.git
   cd snipai
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` directory:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/snipai
   JWT_SECRET=your_jwt_secret
   GEMINI_API_KEY=your_gemini_api_key
   ```
   Start the backend server:
   ```bash
   node server.js
   ```

3. **Frontend Setup**
   Open a new terminal window:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## 🌐 Deployment Links
* **Live Application:** `[Add your Vercel link here]`
* **API Server:** `[Add your Render link here]`

*(See deployment instructions below to generate these links)*

---

## ☁️ How to Deploy

### 1. Deploy the Backend (Render.com)
1. Create a free account on [Render](https://render.com).
2. Click **New +** -> **Web Service**.
3. Connect your GitHub and select the `snipai` repository.
4. Set the **Root Directory** to `backend`.
5. Build Command: `npm install`
6. Start Command: `node server.js`
7. In the **Environment Variables** section, add your `MONGO_URI` (must be a MongoDB Atlas cloud URI, not localhost), `JWT_SECRET`, and `GEMINI_API_KEY`.
8. Click **Create Web Service**. 

### 2. Deploy the Frontend (Vercel.com)
1. Create a free account on [Vercel](https://vercel.com).
2. Click **Add New** -> **Project**.
3. Import your `snipai` GitHub repository.
4. Edit the **Root Directory** to be `frontend`.
5. Vercel will automatically detect it is a Vite/React project.
6. Click **Deploy**.

Once both are deployed, you just need to update the API fetch URLs in your React code from `http://localhost:5000` to your new Render URL!
