import React, { useState } from 'react';

function AddProduct() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [creator] = useState('anon');

  const handleAddProduct = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:8000/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify({
        title,
        description,
        image_url: imageUrl,
        creator,
      }),
    });

    if (response.ok) {
      alert('Produkt dodany!');
      setTitle('');
      setDescription('');
      setImageUrl('');
    } else {
      alert('Błąd przy dodawaniu produktu.');
    }
  };

  return (
    <form onSubmit={handleAddProduct}>
      <h2>Dodaj produkt</h2>
      <input
        type="text"
        placeholder="Tytuł"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      /><br />
      <textarea
        placeholder="Opis"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      ></textarea><br />
      <input
        type="text"
        placeholder="URL obrazka"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      /><br />
      <button type="submit">Dodaj</button>
    </form>
  );
}

export default AddProduct;
