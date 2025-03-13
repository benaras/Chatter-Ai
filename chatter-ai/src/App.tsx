import { useState } from 'react'
import './App.css'

function ChatterAI() {
  const [count, setCount] = useState(0)

  return (
    <>
      <img src="https://images.unsplash.com/photo-1612838320302-3b3b3b3b3b3b" alt="Chatter Ai" />
      <h1>Chatter Ai</h1>
      <div className="card">
        <p>
          Language-Learning App with AI Chatbot
          <p>This project is created by Shachi, Devansh, Nikhila, and Arman</p>
        </p>
      </div>
    </>
  )
}

export default ChatterAI
