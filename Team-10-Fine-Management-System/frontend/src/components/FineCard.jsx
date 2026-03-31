import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react'; // Standard library
import API from '../services/api';

const FineCard = ({ violation }) => {
  const [utr, setUtr] = useState('');
  const [paid, setPaid] = useState(violation.fine_status === 'paid');

  // YOUR REAL UPI CONFIG
  const myUPI = "pvkr2712@oksbi"; // Replace with your actual UPI ID
  const payeeName = "VinayKumar";
  const upiUrl = `upi://pay?pa=${myUPI}&pn=${payeeName}&am=${violation.fine_amount}&tn=FineID_${violation.id}&cu=INR`;

  const handlePaymentSubmit = async () => {
    if (!utr) return alert("Please enter the Transaction ID (UTR)");

    try {
      await API.put(`/pay/${violation.id}`, { transaction_id: utr });
      setPaid(true);
      alert("Payment submitted! Admin will verify.");
    } catch (err) {
      alert("Error updating payment");
    }
  };

  return (
    <div className={`fine-card ${paid ? 'paid' : 'pending'}`}>
      <h3>{violation.violation_type}</h3>
      <p>Amount: <strong>₹{violation.fine_amount}</strong></p>
      
      {violation.fine_amount > 0 && !paid ? (
        <div className="qr-section">
          <QRCodeSVG value={upiUrl} size={180} includeMargin={true} />
          <p className="hint">Scan with GPay, PhonePe, or Paytm</p>
          
          <input 
            type="text" 
            placeholder="Enter 12-digit UTR/Ref No." 
            value={utr}
            onChange={(e) => setUtr(e.target.value)}
          />
          <button onClick={handlePaymentSubmit}>Submit Transaction ID</button>
        </div>
      ) : (
        <p className="status-text">{paid ? "✅ PAID" : "⚠️ WARNING (No Fine)"}</p>
      )}
    </div>
  );
};

export default FineCard;