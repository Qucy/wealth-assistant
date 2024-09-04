'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';

export default function LoginForm() {
  const [username, setUsername] = useState('demo@example.com');
  const [password, setPassword] = useState('password123');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual login logic
    console.log('Login', { username, password });
    
    // For demo purposes, always navigate to dashboard
    router.push('/dashboard');
  };

  return (
    <div className={styles.loginBox}>
      <h2 className={styles.title}>Wealth Assistant</h2>
      <form onSubmit={handleLogin}>
        <div className={styles.inputGroup}>
          <input
            id="username"
            name="username"
            type="text"
            required
            className={styles.input}
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <input
            id="password"
            name="password"
            type="password"
            required
            className={styles.input}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className={styles.loginButton}>
          Sign In
        </button>
      </form>
    </div>
  );
}
