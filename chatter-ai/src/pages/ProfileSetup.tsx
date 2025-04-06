// src/pages/ProfileSetup.tsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient.ts';
import { useNavigate } from 'react-router-dom';
import styles from './ProfileSetup.module.css';

interface Profile {
  user_id: string;
  username?: string;
  language?: string;
  level?: string;
  // add other fields as needed
}

const ProfileSetup: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [username, setUsername] = useState<string>('');
  const [language, setLanguage] = useState<string>('');
  const [level, setLevel] = useState<string>('');
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
      } else if (data) {
        setProfile(data);
        setUsername(data.username || '');
        setLanguage(data.language || '');
        setLevel(data.level || '');
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase
      .from('profiles')
      .update({ username, language, level })
      .eq('user_id', profile?.user_id);

    if (error) {
      console.error('Error updating profile:', error.message);
    } else {
      navigate('/'); // or redirect to dashboard/chat
    }
  };

  return (
    <div className={styles.container}>
      <h2>Edit Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className={styles.input}
        />

        <label htmlFor="language-select" className={styles.label}>
          Select a language
        </label>
        <select
          id="language-select"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          required
          className={styles.input}
        >
          <option value="">Select a language</option>
          <option value="Spanish">Spanish</option>
          <option value="French">French</option>
          <option value="Italian">Italian</option>
          <option value="Portuguese">Portuguese</option>
        </select>

        <label htmlFor="level-select" className={styles.label}>
          Select a level
        </label>
        <select
          id="level-select"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          required
          className={styles.input}
        >
          <option value="">Select a level</option>
          <option value="A1">Absolute Beginner: A1</option>
          <option value="A2">Seasoned Beginner: A2</option>
          <option value="B1">Low Intermediate: B1</option>
          <option value="B2">High Intermediate: B2</option>
          <option value="C1">Advanced: C1</option>
          <option value="C2">Native: C2</option>
        </select>

        <button type="submit" className={styles.button}>
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ProfileSetup;
