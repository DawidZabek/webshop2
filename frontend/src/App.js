import React, { useState } from 'react';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import Auth from './components/Auth';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <div className="App" style={{ maxWidth: '600px', margin: 'auto' }}>
      <h1>🛒 Webshop2</h1>

      {!isLoggedIn ? (
        <Auth onLogin={() => setIsLoggedIn(true)} />
      ) : (
        <>
          <button onClick={handleLogout}>Wyloguj</button>
          <AddProduct />
          <hr />
          <ProductList />
        </>
      )}
    </div>
  );
}

export default App;
