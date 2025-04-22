import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SearchProducts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await axios.get('/api/products', {
      params: {
        search: searchTerm,
        category: category
      }
    });
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, [searchTerm, category]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search product..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <select onChange={e => setCategory(e.target.value)} value={category}>
        <option value="">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="fashion">Fashion</option>
      </select>

      <ul>
        {products.map(p => (
          <li key={p._id}>{p.name} - {p.category}</li>
        ))}
      </ul>
    </div>
  );
}

export default SearchProducts;
