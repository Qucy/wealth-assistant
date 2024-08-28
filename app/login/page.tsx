'use client'

import Image from 'next/image';
import styles from './login.module.css';
import { useState } from 'react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement login logic
    console.log('Login', { username, password });
  };

  return (
    <div className={styles.container}>
      <Image
        src="/images/login-background.jpg"
        alt="Login background"
        layout="fill"
        objectFit="cover"
        quality={75}
        priority
      />
      <div className={styles.overlay}>
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
              Login
            </button>
          </form>
        </div>
        <div className={styles.footer}>
          © 2024 Wealth Assistant. All rights reserved.
        </div>
      </div>
    </div>
  );
}