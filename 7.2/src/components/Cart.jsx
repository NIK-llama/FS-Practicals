import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../features/cartSlice';

function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  return (
    <div className="product-list-container" style={{ marginTop: "32px" }}>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? <p>Cart is empty</p> :
        <div className="product-card-wrapper">
          {cartItems.map((item) => (
            <div className="product-card" key={item.id}>
              <h3>{item.name}</h3>
              <p>Price: ${item.price}</p>
              <p>
                Quantity:
                <input 
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={e => 
                    dispatch(updateQuantity({ id: item.id, quantity: Number(e.target.value) }))
                  }
                  style={{ marginLeft: "8px", width: "50px" }}
                />
              </p>
              <button className="buy-now-btn" onClick={() => dispatch(removeFromCart(item.id))}>
                Remove
              </button>
            </div>
          ))}
        </div>
      }
      {cartItems.length > 0 &&
        <button className="buy-now-btn" style={{ marginTop: "16px" }} onClick={() => dispatch(clearCart())}>
          Clear Cart
        </button>
      }
    </div>
  );
}

export default Cart;
