# Project Name: Chatter-Ai

# Team Name: 11

# Team Members: 
- Shachi Benara @benaras
- Devansh Jain @Devansh-Jain1
- Arman Meraj @Armanmeraj
- Nikhila Peravali @NikhilaPeravali

# Brief Overview of the Application
Chatter AI is an AI-powered language learning application that provides real-time conversational practice for students. It can acts as a virtual language partner, adapting to the learner's proficiency level and using AI-driven conversations to enhance language acquisition naturally. By focusing on comprehensible input, Chatter AI helps users improve their skills through immersive and interactive dialogue.

# Setup Instructions

Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)
- Supabase account
- OpenAI API key

 Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/Chatter-Ai.git
   cd Chatter-Ai/chatter-ai
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   npm install
   
   # Install server dependencies
   cd server
   npm install
   cd ..
   ```

3. **Environment Setup**
   
   Create a `.env` file in the root of the chatter-ai directory with the following variables:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_OPENAI_API_KEY=your_openai_api_key
   ```
   
Running the Application
**Start the frontend development server**
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`

## Project Structure

```
Chatter-Ai/
├── README.md                   # Project documentation
├── chatter-ai/                 # Main application directory
│   ├── .env                    # Environment variables
│   ├── index.html              # Entry HTML file
│   ├── package.json            # Frontend dependencies
│   ├── tsconfig.json           # TypeScript configuration
│   ├── vite.config.ts          # Vite configuration
│   ├── public/                 # Static assets
│   ├── server/                 # Backend server
│   │   ├── server.js           # Express server
│   │   ├── package.json        # Server dependencies
│   │   └── .env                # Server environment variables
│   └── src/                    # Frontend source code
│       ├── App.tsx             # Main React component
│       ├── App.module.css       # Component styles
│       ├── main.tsx            # Application entry point
│       ├── supabaseClient.ts    # Supabase client configuration
│       ├── assets/             # Images, fonts, etc.
│       │   └── Chatter AI.svg    # Logo
│       ├── data/               # (Optional) Data files
│       │   └── vocabulary/     # Vocabulary data by language
│       │       ├── spanish/    # Spanish vocabulary
│       │       │   ├── a1.json # A1 level words
│       │       │   ├── a2.json # A2 level words
│       │       │   └── ...     # Other levels
│       │       ├── french/     # French vocabulary
│       │       └── ...         # Other languages
│       └── pages/              # React page components
│           ├── Auth.tsx        # Authentication page
│           ├── Auth.module.css  # Auth styles
│           ├── Chat.tsx        # Chat interface
│           ├── Chat.module.css  # Chat styles
│           ├── Home.tsx        # Home page
│           ├── Home.module.css  # Home styles
│           ├── ProfileSetup.tsx # User profile setup
│           └── ProfileSetup.module.css # Profile setup styles
```
