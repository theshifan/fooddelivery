import React, { useEffect, useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch cart items on mount
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    const token = localStorage.getItem('access'); // Get token
    setLoading(true);

    try {
      const response = await api.get('api/cart/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartItems(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
      toast.error('Failed to fetch cart items.');
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (id, quantity) => {
    if (quantity < 1) return; // Prevent unnecessary API calls

    const token = localStorage.getItem('access'); // Get token

    try {
      await api.patch(`api/cart/${id}/`, { quantity }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Quantity updated!');
      fetchCart();  // Re-fetch the cart after update
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast.error('Failed to update quantity.');
    }
  };

  const removeItem = async (id) => {
    const token = localStorage.getItem('access'); // Get token

    try {
      await api.delete(`api/cart/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Item removed from cart.');
      fetchCart();  // Re-fetch the cart after removal
    } catch (error) {
      console.error('Error removing item:', error);
      toast.error('Failed to remove item.');
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => {
      const price = parseFloat(item.food_item?.price) || 0;  // Ensure price is a valid number
      return acc + item.quantity * price;
    }, 0);
  };
// Checking out button
const navigate = useNavigate();

const handleCheckout = () => {
  navigate('/checkout');
};
  if (loading) return <div>Loading cart...</div>;

  

  return (
    <div className="container-fluid bg-light bg-icon my-5 py-6">
      <div className="container">
        <div className="section-header text-center mx-auto mb-5 wow fadeInUp">
          <h1 className="display-5 mb-3">Your Cart</h1>
          <p>Review and manage your selected items</p>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center font-weight-bold">
            <p>Your cart is empty.</p>
            <p>Click here to add items to your cart{' '}
              <a href="/menu">menu</a>.
            </p>
          </div>
        ) : (
          <div className="row g-4">
            {cartItems.map((item) => {
              const price = parseFloat(item.food_item?.price) || 0;  // Ensure price is a valid number

              return (
                <div className="col-lg-4 col-md-6" key={item.id}>
                  <div className="bg-white text-center h-100 p-4 p-xl-5">
                    <img
                      src={item.food_item?.image || '/default-image.jpg'}
                      onError={(e) => { e.target.src = '/default-image.jpg'; }}
                      alt={item.food_item?.name}
                      className="img-fluid mb-4"
                    />
                    <h4 className="mb-3">{item.food_item?.name}</h4>
                    <p>
                      {price !== 0 ? `₹${price.toFixed(2)}` : 'Price not available'}
                    </p>
                    <div className="quantity-controls">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="btn btn-outline-primary py-2 px-4 rounded-pill"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="btn btn-outline-primary py-2 px-4 rounded-pill"
                      >
                        +
                      </button>
                    </div>

                    <br />

                    <button
                      className="btn btn-outline-danger py-2 px-4 rounded-pill"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
            <div className="col-12 mt-4">
              <div className="text-center">
                <h3>Total: ₹{calculateTotal().toFixed(2)}</h3>
                <button
                  onClick={handleCheckout}
                  className="btn btn-primary py-3 px-5 rounded-pill"
                  disabled={loading || cartItems.length === 0}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
