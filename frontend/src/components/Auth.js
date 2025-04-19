import React, { useState } from 'react';

function Auth({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('login');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = mode === 'login' ? 'login' : 'register';

    const res = await fetch(`http://localhost:8000/api/${url}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      if (mode === 'login') {
        const data = await res.json();
        localStorage.setItem('token', data.token);
        onLogin();
      } else {
        alert('Zarejestrowano! Teraz się zaloguj.');
        setMode('login');
      }
    } else {
      const err = await res.json();
      alert(err.message || 'Błąd');
    }
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <h2>{mode === 'login' ? 'Logowanie' : 'Rejestracja'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Login"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        /><br />
        <input
          type="password"
          placeholder="Hasło"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        <button type="submit">
          {mode === 'login' ? 'Zaloguj' : 'Zarejestruj'}
        </button>
      </form>
      <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')} style={{ marginTop: '10px' }}>
        {mode === 'login' ? 'Nie masz konta? Zarejestruj się' : 'Masz konto? Zaloguj się'}
      </button>
    </div>
  );
}

export default Auth;
