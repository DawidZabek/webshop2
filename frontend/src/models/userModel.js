const BASE_URL = 'http://localhost:8000/api';

export const registerUser = async (username, password) => {
  const res = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();

  if (res.ok) {
    alert('Rejestracja zakończona – możesz się zalogować!');
    return true;
  } else {
    alert(data.message || 'Coś poszło nie tak.');
    return false;
  }
};

export const loginUser = async (username, password) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();

  if (res.ok) {
    localStorage.setItem('token', data.token);
    window.location.reload();
    return true;
  } else {
    alert(data.message || 'Nieprawidłowe dane logowania.');
    return false;
  }
};
