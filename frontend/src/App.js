import React from 'react';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import Auth from './components/Auth';
import './index.css';

function App() {
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl p-8">
        {token && (
          <button
            onClick={handleLogout}
            className="absolute top-4 right-4 text-sm text-red-500 hover:text-red-700"
          >
             Wyloguj się
          </button>
        )}

        <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-10 tracking-tight">
          🛍️ Webshop2
        </h1>

        {!token ? (
          <Auth />
        ) : (
          <>
            <AddProduct />
            <hr className="my-6" />
            <ProductList />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
