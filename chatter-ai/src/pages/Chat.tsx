// src/pages/Chat.tsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import styles from './Chat.module.css';

interface Message {
  role: 'assistant' | 'user';
  content: string;
}

interface UserProfile {
  language: string;
  level: string;
  known_words?: string[];
  developing_words?: string[];
  // add other fields as needed
}

const Chat: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hi! Ready to practice your language skills?' }
  ]);
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // Load user profile from Supabase
  useEffect(() => {
    const loadProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error('Failed to load profile:', error.message);
      } else {
        setUserProfile(data);
      }
    };

    loadProfile();
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || !userProfile) return;

    const newMessages: Message[] = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    // Prepare OpenAI message history
    const promptMessages = [
      {
        role: 'system',
        content: `
You are a friendly language tutor speaking in ${userProfile.language}. 
The user is at ${userProfile.level} level. 
They know these words: ${JSON.stringify(userProfile.known_words)}. 
They are currently learning: ${JSON.stringify(userProfile.developing_words)}. 
Make sure to speak appropriately to their level and gradually introduce new words.
`
      },
      ...newMessages
    ];

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: promptMessages
        })
      });

      const data = await response.json();
      const aiMessage = data.choices[0].message;

      setMessages([...newMessages, aiMessage]);
    } catch (err) {
      console.error('OpenAI error:', err);
    }

    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <h2>🧠 AI Chat</h2>
      <div className={styles.chatBox}>
        {messages.map((msg, i) => (
          <div key={i} className={msg.role === 'user' ? styles.messageUser : styles.messageAI}>
            <strong>{msg.role === 'user' ? 'You' : 'AI'}:</strong> {msg.content}
          </div>
        ))}
        {loading && <p><em>AI is thinking...</em></p>}
      </div>

      <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className={styles.input}
        />
        <button type="submit" disabled={loading} className={styles.button}>Send</button>
      </form>
    </div>
  );
};

export default Chat;
