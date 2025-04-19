import React, { useEffect, useState } from 'react';

function ProductList() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await fetch('http://localhost:8000/api/products');
    const data = await res.json();
    setProducts(data);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Usunąć produkt?')) return;

    const res = await fetch(`http://localhost:8000/api/products/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });

    if (res.status === 204) {
      alert('Usunięto');
      setProducts(products.filter(p => p._id !== id));
    } else {
      alert('Błąd usuwania');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-700 mb-4">📦 Produkty</h2>
      {products.map(p => (
        <div
          key={p._id}
          className="border border-gray-300 rounded-lg p-4 mb-4 shadow-sm bg-gray-50"
        >
          <h3 className="text-lg font-bold text-blue-700">{p.title}</h3>
          <p className="text-gray-600 mb-2">{p.description}</p>
          {p.image_url && (
            <img
              src={p.image_url}
              alt={p.title}
              className="w-full max-w-xs mb-2 rounded"
            />
          )}
          <button
            onClick={() => handleDelete(p._id)}
            className="mt-2 text-sm text-red-500 hover:underline"
          >
            🗑️ Usuń
          </button>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
