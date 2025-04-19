import React, { useState } from 'react';

function Auth() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('login'); // login or register

  const handleSubmit = async () => {
    const url = mode === 'login'
      ? 'http://localhost:8000/api/login'
      : 'http://localhost:8000/api/register';

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.ok) {
      if (mode === 'login') {
        localStorage.setItem('token', data.token);
        window.location.reload();
      } else {
        alert('Rejestracja zakończona – możesz się zalogować!');
        setMode('login');
      }
    } else {
      alert(data.message || 'Coś poszło nie tak.');
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-700">
        {mode === 'login' ? '🔐 Logowanie' : '📝 Rejestracja'}
      </h2>

      <input
        type="text"
        placeholder="Login"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full border px-3 py-2 rounded"
      />

      <input
        type="password"
        placeholder="Hasło"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border px-3 py-2 rounded"
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
      >
        {mode === 'login' ? 'Zaloguj się' : 'Zarejestruj się'}
      </button>

      <p className="text-center text-sm text-gray-500">
        {mode === 'login' ? 'Nie masz konta?' : 'Masz już konto?'}{' '}
        <button
          onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
          className="text-blue-500 hover:underline"
        >
          {mode === 'login' ? 'Zarejestruj się' : 'Zaloguj się'}
        </button>
      </p>
    </div>
  );
}

export default Auth;
