import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

/**
 * CartItem.jsx - Shopping Cart page for Paradise Nursery.
 * Cart data comes from the Redux store via useSelector, so every value
 * (totals, quantities, header cart icon) updates in real time whenever
 * an item is added, incremented, decremented, or deleted.
 */
const CartItem = ({ onContinueShopping }) => {
  // Live cart state from Redux; any change re-renders this component
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Helper: convert a price like "$15" or 15 into a number
  const parseCost = (cost) =>
    typeof cost === 'number' ? cost : parseFloat(String(cost).replace('$', '')) || 0;

  // REQUIREMENT: Total number of plants in the cart (sum of quantities)
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  // REQUIREMENT: Show the total cart amount of all plants
  // Uses reduce() to sum (unit price x quantity) for every item in one pass
  const calculateTotalAmount = () =>
    cart.reduce((sum, item) => sum + parseCost(item.cost) * item.quantity, 0).toFixed(2);

  // REQUIREMENT: Show the total cost for each plant in the cart
  const calculateTotalCost = (item) => (parseCost(item.cost) * item.quantity).toFixed(2);

  // REQUIREMENT: Continue Shopping button links back to the product listing page
  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping(e);
  };

  // REQUIREMENT: Checkout button shows a "Coming Soon" message
  const handleCheckoutShopping = () => {
    alert('Coming Soon');
  };

  // REQUIREMENT: Increase quantity by one; Redux updates totals and the cart icon
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // REQUIREMENT: Decrease quantity by one; removes the item when it reaches zero
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  // REQUIREMENT: Delete button removes the plant type from the cart
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  return (
    <div className="cart-container">
      {/* Total cost of all items, recalculated on every cart change */}
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>

      {/* Total number of plants in the cart */}
      <h3 style={{ color: 'black' }}>Total Plants in Cart: {totalQuantity}</h3>

      {/* Edge case: empty cart */}
      {cart.length === 0 ? (
        <p className="cart-empty">Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div className="cart-item" key={item.name}>
              {/* Thumbnail */}
              <img className="cart-item-image" src={item.image} alt={item.name} />

              <div className="cart-item-details">
                {/* Plant name */}
                <div className="cart-item-name">{item.name}</div>

                {/* Unit price */}
                <div className="cart-item-cost">
                  Unit Price: ${parseCost(item.cost).toFixed(2)}
                </div>

                {/* Increase / decrease quantity */}
                <div className="cart-item-quantity">
                  <button
                    className="cart-item-button cart-item-button-dec"
                    onClick={() => handleDecrement(item)}
                  >
                    -
                  </button>
                  <span className="cart-item-quantity-value">{item.quantity}</span>
                  <button
                    className="cart-item-button cart-item-button-inc"
                    onClick={() => handleIncrement(item)}
                  >
                    +
                  </button>
                </div>

                {/* Total cost for this plant type */}
                <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>

                {/* Delete button */}
                <button className="cart-item-delete" onClick={() => handleRemove(item)}>
                  Delete
                </button>
              </div> </div>
          ))}
        </div>
      )}
 
      <div className="continue_shopping_btn">
        {/* Back to the product listing page */}
        <button className="get-started-button" onClick={handleContinueShopping}>
          Continue Shopping
        </button> <br />
        {/* Checkout placeholder */}
        <button className="get-started-button1" onClick={handleCheckoutShopping}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;