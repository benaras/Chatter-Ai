import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const ProfileSetup = () => {
  const [profile, setProfile] = useState(null);
  const [username, setUsername] = useState('');
  const [language, setLanguage] = useState('');
  const [level, setLevel] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        navigate('/auth');
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error('Error loading profile:', error.message);
      } else {
        setProfile(data);
        setUsername(data.username || '');
        setLanguage(data.language || '');
        setLevel(data.level || '');
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from('profiles')
      .update({ username, language, level })
      .eq('user_id', profile.user_id);

    if (error) {
      console.error('Error updating profile:', error.message);
    } else {
      navigate('/'); // or redirect to dashboard/chat
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto', textAlign: 'center' }}>
      <h2>Edit Your Profile</h2>
      <form onSubmit={handleSubmit}>
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

        <button type="submit" style={{ padding: '10px 20px' }}>
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ProfileSetup;
