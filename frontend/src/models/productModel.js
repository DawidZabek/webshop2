const API_URL = 'http://localhost:8000/api/products';

export const fetchProducts = async () => {
  const res = await fetch(API_URL);
  const data = await res.json();
  return data;
};

export const addProduct = async (title, description, image_url) => {
  const token = localStorage.getItem('token');
  if (!token) {
    alert("Zaloguj się, aby dodać produkt.");
    return false;
  }

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, description, image_url }),
  });

  if (res.ok) {
    alert('Dodano!');
    return true;
  } else {
    alert('Błąd dodawania.');
    return false;
  }
};

export const deleteProduct = async (id) => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 204) {
    alert('Usunięto');
    return true;
  } else {
    alert('Błąd usuwania');
    return false;
  }
};
