import React, { useState } from 'react';

function AddProduct() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleAddProduct = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    if (!token) {
        alert("Zaloguj się, aby dodać produkt.");
        return;
      }

    const response = await fetch('http://localhost:8000/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, description, image_url: imageUrl }),
    });
    if (response.ok) {
      alert('Dodano!');
      setTitle('');
      setDescription('');
      setImageUrl('');
    } else {
      alert('Błąd dodawania.');
    }
  };

  return (
    <form onSubmit={handleAddProduct} className="bg-white p-6 rounded-xl shadow-md mb-8 space-y-4">
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">➕ Dodaj produkt</h2>
      <input
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        type="text"
        placeholder="Tytuł"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        className="w-full border border-gray-300 rounded-lg px-4 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Opis"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        className="w-full border border-gray-300 rounded px-3 py-2"
        type="text"
        placeholder="Obrazek – URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700"
      >
        Dodaj
      </button>
    </form>
  );
}


export default AddProduct;
