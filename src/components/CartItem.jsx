import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from '../store/CartSlice';
import './CartItem.css'; // Optional styling file

function CartItem({ onContinueShopping }) {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate the total cost for all plants combined
  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => total + (item.cost * item.quantity), 0);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity === 1) {
      dispatch(removeItem(item.name));
    } else {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    }
  };

  const handleRemove = (name) => {
    dispatch(removeItem(name));
  };

  // Calculate subtotal for an individual plant type
  const calculateSubtotal = (item) => {
    return item.cost * item.quantity;
  };

  return (
    <div className="cart-container">
      <h2 className="cart-total-title">Total Cart Amount: ${calculateTotalAmount()}</h2>
      
      {cartItems.length === 0 ? (
        <div className="empty-cart-msg">Your cart is currently empty.</div>
      ) : (
        <div className="cart-items-list">
          {cartItems.map(item => (
            <div key={item.name} className="cart-item-card">
              <img src={item.image} alt={item.name} className="cart-item-image" width="100" />
              <div className="cart-item-details">
                <h3 className="cart-item-name">{item.name}</h3>
                <p className="cart-item-cost">Unit Price: ${item.cost}</p>
                <p className="cart-item-subtotal">Subtotal: ${calculateSubtotal(item)}</p>
                
                <div className="quantity-control-panel">
                  <button className="qty-btn" onClick={() => handleDecrement(item)}>-</button>
                  <span className="qty-display">{item.quantity}</span>
                  <button className="qty-btn" onClick={() => handleIncrement(item)}>+</button>
                </div>
                
                <button className="delete-btn" onClick={() => handleRemove(item.name)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="cart-actions-wrapper">
        <button className="continue-shopping-btn" onClick={onContinueShopping}>
          Continue Shopping
        </button>
        <button 
          className="checkout-btn" 
          onClick={() => alert('Checkout functionality coming soon!')}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

export default CartItem;