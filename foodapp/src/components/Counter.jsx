import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  const reset = () => setCount(0);

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Counter: {count}</h1>
      <div>
        <button onClick={decrement} disabled={count <= 0}>-</button>
        <button onClick={reset} style={{ margin: '0 10px' }}>Reset</button>
        <button onClick={increment}>+</button>
      </div>
    </div>
  );
}

export default Counter;
