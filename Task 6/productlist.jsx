import React from 'react';
import { useNavigate } from 'react-router-dom';

function ProductList({ products }) {
  const navigate = useNavigate();

  return (
    <table>
      <thead>
        <tr><th>Name</th><th>Category</th><th>Actions</th></tr>
      </thead>
      <tbody>
        {products.map(product => (
          <tr key={product._id}>
            <td>{product.name}</td>
            <td>{product.category}</td>
            <td>
              <button onClick={() => navigate(`/edit/${product._id}`)}>Edit</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProductList;
