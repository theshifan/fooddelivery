import React, { useEffect, useState } from 'react';
import api from '../api';
import './css/product.css';

function Product({ setCartItems }) {
  const [features, setFeatures] = useState([]);
  const [quantities, setQuantities] = useState({});         // Holds quantity per food item ID
  const [visibleCounters, setVisibleCounters] = useState({}); // Tracks which items show the quantity counter

  // Fetch food items from backend when component mounts
  useEffect(() => {
    api.get('/api/list/food-items/', {
      withCredentials: true
    })
      .then(res => {
        setFeatures(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  // When "Add to Cart" is clicked, show quantity counter
  const handleAddToCartClick = (id) => {
    setVisibleCounters(prev => ({ ...prev, [id]: true }));
    setQuantities(prev => ({ ...prev, [id]: 1 })); // Default quantity is 1
  };

  // Increment quantity
  const increment = (id) => {
    setQuantities(prev => ({ ...prev, [id]: prev[id] + 1 }));
  };

  // Decrement quantity, but never below 1
  const decrement = (id) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(prev[id] - 1, 1)
    }));
  };

  // 🛒 Send cart item to backend
  const handleOrderNow = (item) => {
    const token = localStorage.getItem('access');
    const quantity = quantities[item.id];

    api.post('/api/cart/', {
      food_item_id: item.id,         // ✅ This must match your DRF serializer
      quantity: quantity
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      console.log('Added to cart:', res.data);
      alert('Item added to cart!');
    }).catch(err => {
      console.error('Error adding to cart:', err.response?.data || err.message);
    });
  };

  return (
    <div className="container-fluid bg-light bg-icon my-5 py-6">
      <div className="container">
        <div className="section-header text-center mx-auto mb-5 wow fadeInUp">
          <h1 className="display-5 mb-3">MENU</h1>
          <p>Explore our delicious options!</p>
        </div>

        <div className="row g-4">
          {features.map((feature, index) => (
            <div className="col-lg-4 col-md-6" key={index}>
              <div className="bg-white text-center h-100 p-4 p-xl-5">
                <img className="img-fluid mb-4" src={feature.img} alt={feature.name} />
                <h4 className="mb-3">{feature.name}</h4>
                <p>{feature.description}</p>
                <p>{feature.food_type}</p>
                <p>{feature.category}</p>
                <p>{feature.cuisine}</p>

                {/* If counter not visible, show "Add to Cart" button */}
                {!visibleCounters[feature.id] ? (
                  <button
                    className="btn btn-outline-primary border-2 py-2 px-4 rounded-pill"
                    onClick={() => handleAddToCartClick(feature.id)}
                  >
                    Add to Cart
                  </button>
                ) : (
                  <>
                    {/* Quantity counter with + and - buttons */}
                    <div className="btn1-group btn btn-outline-primary border-2 py-2 px-4 rounded-pill">
                      <button onClick={() => increment(feature.id)} className="button1 rounded-pill">
                        <p style={{ color: "blue" }}>+</p>
                      </button>
                      <button className="button1 rounded-pill">
                        <p style={{ color: "blue" }}>{quantities[feature.id]}</p>
                      </button>
                      <button onClick={() => decrement(feature.id)} className="button1 rounded-pill">
                        <p style={{ color: "blue" }}>-</p>
                      </button>
                    </div>

                    <br />

                    {/* Final "Order Now" button */}
                    <button
                      className="btn btn-outline-primary border-2 py-2 px-4 rounded-pill"
                      onClick={() => handleOrderNow(feature)}
                    >
                      Order Now
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Product;
