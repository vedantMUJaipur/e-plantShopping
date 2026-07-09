import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../store/CartSlice';
import CartItem from './CartItem'; // We will create this in Task 7
import './ProductList.css'; // Optional styling file

function ProductList() {
  const [showCart, setShowCart] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  // Dynamically calculate total number of items in the cart
  const totalCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantCategories = [
    {
      category: 'Air Purifying Plants',
      plants: [
        { name: 'Snake Plant', cost: 15, image: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?q=80&w=400' },
        { name: 'Spider Plant', cost: 12, image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?q=80&w=400' },
        { name: 'Peace Lily', cost: 18, image: 'https://images.unsplash.com/photo-1593691509543-c55fb32e7355?q=80&w=400' },
        { name: 'Boston Fern', cost: 14, image: 'https://images.unsplash.com/photo-1512428813833-df44b97249a2?q=80&w=400' },
        { name: 'Aloe Vera', cost: 10, image: 'https://images.unsplash.com/photo-1596547613531-785efb6ae9f0?q=80&w=400' },
        { name: 'English Ivy', cost: 13, image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=400' }
      ]
    },
    {
      category: 'Aromatic Plants',
      plants: [
        { name: 'Lavender', cost: 20, image: 'https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?q=80&w=400' },
        { name: 'Rosemary', cost: 11, image: 'https://images.unsplash.com/photo-1515514120779-99a224a1b820?q=80&w=400' },
        { name: 'Mint', cost: 8, image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?q=80&w=400' },
        { name: 'Basil', cost: 9, image: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?q=80&w=400' },
        { name: 'Jasmine', cost: 22, image: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?q=80&w=400' },
        { name: 'Eucalyptus', cost: 16, image: 'https://images.unsplash.com/photo-1550950158-d0d960dff51b?q=80&w=400' }
      ]
    },
    {
      category: 'Medicinal Plants',
      plants: [
        { name: 'Oregano', cost: 10, image: 'https://images.unsplash.com/photo-1608797178974-15b35a61d121?q=80&w=400' },
        { name: 'Marigold', cost: 12, image: 'https://images.unsplash.com/photo-1588613460824-345091c6bf48?q=80&w=400' },
        { name: 'Thyme', cost: 9, image: 'https://images.unsplash.com/photo-1594911775771-550ffda6d6a7?q=80&w=400' },
        { name: 'Holy Basil (Tulsi)', cost: 15, image: 'https://images.unsplash.com/photo-1615228939096-9ead6c74008e?q=80&w=400' },
        { name: 'Lemongrass', cost: 11, image: 'https://images.unsplash.com/photo-1569431062083-09477b8ccb63?q=80&w=400' },
        { name: 'Chamomile', cost: 14, image: 'https://images.unsplash.com/photo-1551717303-9c3a36d2e9e2?q=80&w=400' }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  return (
    <div className="product-page-container">
      {/* Universal Navigation Bar */}
      <nav className="navbar">
        <div className="nav-logo" onClick={() => window.location.reload()}>
          <h3>Paradise Nursery</h3>
        </div>
        <div className="nav-links">
          <span onClick={() => setShowCart(false)} className={!showCart ? "active-link" : ""}>Plants</span>
          <span onClick={() => setShowCart(true)} className={showCart ? "active-link" : ""}>
            Cart <span className="cart-badge">{totalCartCount}</span>
          </span>
        </div>
      </nav>

      {/* Conditional Rendering between Product Grid or Cart View */}
      {!showCart ? (
        <div className="categories-wrapper">
          {plantCategories.map((cat) => (
            <div key={cat.category} className="category-section">
              <h2 className="category-title">{cat.category}</h2>
              <div className="products-grid">
                {cat.plants.map((plant) => {
                  const isAlreadyInCart = cartItems.some(item => item.name === plant.name);
                  return (
                    <div key={plant.name} className="product-card">
                      <img src={plant.image} alt={plant.name} className="product-image" />
                      <h4 className="product-name">{plant.name}</h4>
                      <p className="product-cost">${plant.cost}</p>
                      <button 
                        className={`add-to-cart-btn ${isAlreadyInCart ? 'disabled' : ''}`}
                        disabled={isAlreadyInCart} 
                        onClick={() => handleAddToCart(plant)}
                      >
                        {isAlreadyInCart ? 'Added' : 'Add to Cart'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;