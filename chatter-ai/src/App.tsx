import { useState } from 'react'
import './App.css'

function ChatterAI() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Chatter Ai</h1>
      <div className="card">
        <p>
          Language-Learning App with AI Chatbot
        </p>
      </div>
      <img src="https://images.unsplash.com/photo-1612838320302-3b3b3b3b3b3b" alt="Chatter Ai" />
    </>
  )
}

export default ChatterAI
