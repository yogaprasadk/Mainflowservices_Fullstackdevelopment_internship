import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', category: '', price: '' });

  useEffect(() => {
    axios.get(`/api/products/${id}`)
      .then(res => setForm(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/products/${id}`, form);
      alert("Updated successfully!");
      navigate('/');
    } catch (err) {
      alert("Update failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
      <input name="category" value={form.category} onChange={handleChange} placeholder="Category" required />
      <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Price" required />
      <button type="submit">Save</button>
    </form>
  );
}

export default EditProduct;
