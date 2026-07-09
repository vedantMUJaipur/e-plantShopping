import React, { useState } from 'react';
import './App.css';
import ProductList from './components/ProductList';

function App() {
  const [showProductList, setShowProductList] = useState(false);

  return (
    <div className="app-container">
      {!showProductList ? (
        <div className="landing-page">
          <h1>Paradise Nursery</h1>
          <p>Where Greenery Meets Serenity</p>
          <button 
            className="get-started-btn" 
            onClick={() => setShowProductList(true)}
          >
            Get Started
          </button>
        </div>
      ) : (
        <ProductList />
      )}
    </div>
  );
}

export default App;