import React, { useState } from 'react';
import axios from 'axios';
import BillPreview from './BillPreview';

function SearchBill() {
  const [transactionId, setTransactionId] = useState('');
  const [bill, setBill] = useState(null);

  const handleSearch = async () => {
    try {
      const res = await axios.get(`/api/bills/${transactionId}`);
      setBill(res.data);
    } catch (err) {
      alert("Bill not found");
    }
  };

  return (
    <div>
      <input
        placeholder="Enter Transaction ID"
        value={transactionId}
        onChange={(e) => setTransactionId(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {bill && <BillPreview bill={bill} />}
    </div>
  );
}

export default SearchBill;
