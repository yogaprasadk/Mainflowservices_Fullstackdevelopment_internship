import React from 'react';
import ReactToPrint from 'react-to-print';
import { useRef } from 'react';

function BillPreview({ bill }) {
  const ref = useRef();

  const getTotal = () =>
    bill.products.reduce((sum, p) => sum + (p.quantity * p.unitPrice), 0);

  return (
    <div>
      <div ref={ref} style={{ padding: 20, fontFamily: 'Arial' }}>
        <h2>Company Name</h2>
        <p>Company Address | Phone</p>
        <hr />
        <h3>Buyer Info</h3>
        <p>{bill.buyer.name}, {bill.buyer.address}</p>
        <p>{bill.buyer.contact} | {bill.buyer.email}</p>
        <hr />
        <h3>Products</h3>
        <table border="1" cellPadding="5" width="100%">
          <thead>
            <tr><th>Name</th><th>Qty</th><th>Unit Price</th><th>Total</th></tr>
          </thead>
          <tbody>
            {bill.products.map((p, i) => (
              <tr key={i}>
                <td>{p.name}</td>
                <td>{p.quantity}</td>
                <td>{p.unitPrice}</td>
                <td>{p.quantity * p.unitPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h4>Subtotal: ₹{getTotal()}</h4>
        <h4>Total Amount Due: ₹{getTotal()}</h4>
        <hr />
        <p>Transaction ID: {bill.transactionId}</p>
        <p>Date: {new Date(bill.purchaseDate).toLocaleDateString()}</p>
        <p>Payment: {bill.paymentMethod}</p>
      </div>

      <ReactToPrint
        trigger={() => <button>Print / Save PDF</button>}
        content={() => ref.current}
      />
    </div>
  );
}

export default BillPreview;
