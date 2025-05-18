import React, { useEffect, useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [loading, setLoading] = useState(true);
  const [orderProcessing, setOrderProcessing] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem('access');

  // Load cart items
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await api.get('api/cart/', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCartItems(response.data);
      } catch (err) {
        console.error('Cart error:', err);
        if (err.response?.status === 401) {
          localStorage.removeItem('access');
          navigate('/login');
        } else {
          setError('Failed to load cart. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [token, navigate]);

  // Load Razorpay script only when needed
  useEffect(() => {
    if (paymentMethod !== 'razorpay') return;

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onerror = () => {
      setError('Failed to load payment processor. Please try another method.');
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [paymentMethod]);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.food_item?.price) || 0;
      return total + (item.quantity * price);
    }, 0);
  };

  const handleConfirmOrder = async () => {
    if (cartItems.length === 0) {
      setError('Your cart is empty');
      return;
    }

    setOrderProcessing(true);
    setError(null);

    try {
      const totalAmount = Math.round(calculateTotal() * 100); // Convert to paise

      if (paymentMethod === 'razorpay') {
        // Enhanced Razorpay order creation with retry logic
        await createRazorpayOrder(totalAmount);
      } else {
        // Cash on delivery flow
        const orderData = {
          payment_method: 'COD',
          items: cartItems.map(item => ({
            food_item: item.food_item.id,
            quantity: item.quantity
          })),
          total_amount: calculateTotal().toFixed(2)
        };

        const response = await api.post(
          'api/place-order/',
          orderData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        navigate('/order-success', { state: { order: response.data } });
      }
    } catch (err) {
      handleOrderError(err);
    } finally {
      setOrderProcessing(false);
    }
  };

  const createRazorpayOrder = async (amount, retryCount = 0) => {
    try {
      const orderResponse = await api.post(
        'api/create-razorpay-order/',
        { amount },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const { razorpay_order_id, amount: orderAmount, currency } = orderResponse.data;
      launchRazorpay(razorpay_order_id, orderAmount, currency);
    } catch (err) {
      if (retryCount < 2 && err.response?.status >= 500) {
        // Retry for server errors (up to 2 times)
        await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1)));
        return createRazorpayOrder(amount, retryCount + 1);
      }
      throw err;
    }
  };

  const handleOrderError = (err) => {
    console.error('Order error:', err);
    
    if (err.response) {
      switch (err.response.status) {
        case 400:
          setError(err.response.data?.message || 'Invalid request data');
          break;
        case 401:
          localStorage.removeItem('access');
          navigate('/login');
          break;
        case 500:
          setError('Server error occurred. Please try again later.');
          break;
        default:
          setError('Failed to process order. Please try again.');
      }
    } else {
      setError('Network error. Please check your connection.');
    }
  };

  const launchRazorpay = (order_id, amount, currency) => {
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      amount: amount.toString(),
      currency,
      name: 'Your Store',
      description: 'Order Payment',
      order_id,
      handler: async (response) => {
        try {
          await api.post('api/verify-payment/', response, {
            headers: { Authorization: `Bearer ${token}` }
          });
          navigate('/payment-success');
        } catch (err) {
          console.error('Payment verification failed:', err);
          setError('Payment verification failed. Please contact support.');
        }
      },
      prefill: {
        name: localStorage.getItem('username') || '',
        email: localStorage.getItem('email') || '',
        contact: localStorage.getItem('phone') || ''
      },
      theme: { color: '#3399cc' },
      modal: {
        ondismiss: () => {
          setError('Payment was cancelled. Please try again.');
        }
      }
    };

    try {
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error('Razorpay initialization failed:', err);
      setError('Failed to initialize payment. Please try another method.');
    }
  };

  if (loading) {
    return <div className="spinner-container">Loading...</div>;
  }

  return (
    <div className="container mt-5">
<h2 className="mb-4">Checkout</h2>

{error && (
  <div className="alert alert-danger">
    {error}
    <button 
      className="btn-close float-end" 
      onClick={() => setError(null)}
    />
  </div>
)}

<div className="card mb-4">
  <div className="card-header">
    <h5>Order Summary</h5>
  </div>
  <ul className="list-group list-group-flush">
    {cartItems.map(item => (
      <li key={item.id} className="list-group-item d-flex justify-content-between">
        <div>
          <strong>{item.food_item?.name}</strong>
          <div className="text-muted">Quantity: {item.quantity}</div>
        </div>
        <span>₹{(item.quantity * item.food_item.price).toFixed(2)}</span>
      </li>
    ))}
    <li className="list-group-item d-flex justify-content-between fw-bold">
      <span>Total</span>
      <span>₹{calculateTotal().toFixed(2)}</span>
    </li>
  </ul>
</div>

<div className="card mb-4">
  <div className="card-header">
    <h5>Payment Method</h5>
  </div>
  <div className="card-body">
    <div className="form-check mb-3">
      <input
        type="radio"
        id="cash"
        className="form-check-input"
        name="payment"
        checked={paymentMethod === 'cash'}
        onChange={() => setPaymentMethod('cash')}
      />
      <label htmlFor="cash" className="form-check-label">
        Cash on Delivery
      </label>
    </div>
    <div className="form-check">
      <input
        type="radio"
        id="razorpay"
        className="form-check-input"
        name="payment"
        checked={paymentMethod === 'razorpay'}
        onChange={() => setPaymentMethod('razorpay')}
      />
      <label htmlFor="razorpay" className="form-check-label">
        Pay with Razorpay
      </label>
    </div>
  </div>
</div>

<button
  className="btn btn-primary btn-lg w-100"
  onClick={handleConfirmOrder}
  disabled={orderProcessing || cartItems.length === 0}
>
  {orderProcessing ? (
    <>
      <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
      Processing...
    </>
  ) : (
    'Confirm Order'
  )}
</button>
</div>
  );
}

export default Checkout;






