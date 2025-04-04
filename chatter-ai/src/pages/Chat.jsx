import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const Chat = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! Ready to practice your language skills?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

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

    const newMessages = [...messages, { role: 'user', content: input }];
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
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
      <h2>🧠 AI Chat</h2>
      <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '1rem', height: '300px', overflowY: 'scroll', marginBottom: '1rem' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ textAlign: msg.role === 'user' ? 'right' : 'left', margin: '0.5rem 0' }}>
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
          style={{ padding: '10px', width: '80%', marginRight: '1rem' }}
        />
        <button type="submit" disabled={loading}>Send</button>
      </form>
    </div>
  );
};

export default Chat;
