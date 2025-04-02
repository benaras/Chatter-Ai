import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [language, setLanguage] = useState('');
  const [level, setLevel] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (isSignUp) {
      // SIGN UP
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      });

      if (error) {
        setMessage(error.message);
        return;
      }

      setMessage('Sign up successful! Check your email to confirm your account.');

      // We can't create the profile until user confirms their email
      // Profile will be created on login (see below)

    } else {
      // LOGIN
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        setMessage(error.message);
        return;
      }

      if (data.user) {
        const userId = data.user.id;

        // Check if profile exists
        const { data: existingProfile } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', userId)
          .single();

        // If no profile, create one from saved sign-up values
        if (!existingProfile) {
          const { error: insertError } = await supabase.from('profiles').insert([
            {
              user_id: userId,
              username,
              language,
              level,
              known_words: [],
              developing_words: [],
              streak: 0
            }
          ]);

          if (insertError) {
            console.error('Error creating profile:', insertError.message);
          }
        }

        setMessage(`Welcome back, ${username || 'user'}!`);
        navigate('/'); // go to homepage
      }
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto', textAlign: 'center' }}>
      <h2>{isSignUp ? 'Create Account' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: '8px', width: '100%', marginBottom: '1rem' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: '8px', width: '100%', marginBottom: '1rem' }}
        />

        {isSignUp && (
          <>
            <input
              type="text"
              placeholder="Your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ padding: '8px', width: '100%', marginBottom: '1rem' }}
            />

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              required
              style={{ padding: '8px', width: '100%', marginBottom: '1rem' }}
            >
              <option value="">Select a language</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="Italian">Italian</option>
              <option value="Portuguese">Portuguese</option>
            </select>

            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              required
              style={{ padding: '8px', width: '100%', marginBottom: '1rem' }}
            >
              <option value="">Select a level</option>
              <option value="">Select a level</option>
              <option value="A1">Absolute Beginner: A1</option>
              <option value="A2">Seasoned Beginner: A2</option>
              <option value="B1">Low Intermediate: B1</option>
              <option value="B2">High Intermediate: B2</option>
              <option value="C1">Advanced: C1</option>
              <option value="C2">Native: C2</option>
            </select>
          </>
        )}

        <button type="submit" style={{ padding: '10px 20px' }}>
          {isSignUp ? 'Sign Up' : 'Login'}
        </button>
      </form>

      <p style={{ marginTop: '1rem' }}>
        {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          style={{
            color: 'blue',
            background: 'none',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          {isSignUp ? 'Login' : 'Sign Up'}
        </button>
      </p>

      {message && <p style={{ marginTop: '1rem', color: 'red' }}>{message}</p>}
    </div>
  );
};

export default Auth;
