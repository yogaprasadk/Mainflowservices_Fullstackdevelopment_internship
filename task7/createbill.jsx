import React, { useState } from 'react';
import axios from 'axios';

function CreateBill() {
  const [billData, setBillData] = useState({
    buyer: { name: '', address: '', contact: '', email: '' },
    products: [],
    transactionId: '',
    purchaseDate: new Date().toISOString().split('T')[0],
    paymentMethod: 'Cash'
  });

  const handleAddProduct = () => {
    setBillData({ ...billData, products: [...billData.products, { name: '', quantity: 1, unitPrice: 0 }] });
  };

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...billData.products];
    updatedProducts[index][field] = value;
    setBillData({ ...billData, products: updatedProducts });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("buyer.")) {
      const field = name.split(".")[1];
      setBillData({ ...billData, buyer: { ...billData.buyer, [field]: value } });
    } else {
      setBillData({ ...billData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/bills', billData);
    alert("Bill created successfully!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Buyer Info</h3>
      <input name="buyer.name" placeholder="Name" onChange={handleChange} required />
      <input name="buyer.address" placeholder="Address" onChange={handleChange} />
      <input name="buyer.contact" placeholder="Contact" onChange={handleChange} />
      <input name="buyer.email" placeholder="Email" onChange={handleChange} />

      <h3>Products</h3>
      {billData.products.map((p, i) => (
        <div key={i}>
          <input placeholder="Name" value={p.name} onChange={e => handleProductChange(i, 'name', e.target.value)} />
          <input type="number" placeholder="Qty" value={p.quantity} onChange={e => handleProductChange(i, 'quantity', Number(e.target.value))} />
          <input type="number" placeholder="Price" value={p.unitPrice} onChange={e => handleProductChange(i, 'unitPrice', Number(e.target.value))} />
        </div>
      ))}
      <button type="button" onClick={handleAddProduct}>Add Product</button>

      <input name="transactionId" placeholder="Transaction ID" onChange={handleChange} required />
      <input name="purchaseDate" type="date" onChange={handleChange} value={billData.purchaseDate} />
      <select name="paymentMethod" onChange={handleChange}>
        <option value="Cash">Cash</option>
        <option value="Card">Card</option>
        <option value="UPI">UPI</option>
      </select>

      <button type="submit">Generate Bill</button>
    </form>
  );
}

export default CreateBill;
