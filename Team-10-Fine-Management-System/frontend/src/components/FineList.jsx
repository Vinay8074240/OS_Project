import React, { useEffect, useState } from 'react';
import API from '../services/api';
import FineCard from './FineCard';

const FineList = ({ vehicleId }) => {
  const [violations, setViolations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchViolations = async () => {
      try {
        setLoading(true);
        // This hits your Backend: GET http://localhost:5000/api/fines/vehicle/:vehicleId
        const response = await API.get(`/vehicle/${vehicleId}`);
        setViolations(response.data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Could not load violations. Make sure the Backend is running.");
      } finally {
        setLoading(false);
      }
    };

    if (vehicleId) {
      fetchViolations();
    }
  }, [vehicleId]);

  if (loading) return <p>Loading violations...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="fine-list-container">
      <h2>Violation History for {vehicleId}</h2>
      
      {violations.length === 0 ? (
        <div className="no-violations">
          <p>✅ No violations found. Drive safe!</p>
        </div>
      ) : (
        <div className="list-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {violations.map((v) => (
            <FineCard key={v.id} violation={v} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FineList;