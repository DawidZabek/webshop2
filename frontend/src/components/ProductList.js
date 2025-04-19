import React, { useEffect, useState } from 'react';

function ProductList() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await fetch('http://localhost:8000/api/products');
    const data = await res.json();
    setProducts(data);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm('Usunąć produkt?');
    if (!confirm) return;

    const response = await fetch(`http://localhost:8000/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });
    if (response.status === 204) {
      alert('Usunięto produkt!');
      setProducts(products.filter(p => p._id !== id));
    } else {
      alert('Błąd przy usuwaniu.');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Produkty</h2>
      {products.map(p => (
        <div key={p._id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
          <h3>{p.title}</h3>
          <p>{p.description}</p>
          {p.image_url && <img src={p.image_url} alt={p.title} width="200" />}
          <br />
          <button onClick={() => handleDelete(p._id)}>Usuń</button>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
