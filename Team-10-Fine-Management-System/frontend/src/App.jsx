import React, { useEffect, useState } from 'react';
import API from './services/api';
import FineCard from './components/FineCard';
import FineList from './components/FineList';
import './App.css';

function App() {
  const [violations, setViolations] = useState([]);
  const vehicleId = "VEHICLE_UUID_HERE"; // This would normally come from login

  useEffect(() => {
    // Fetch violations for this vehicle
    const fetchFines = async () => {
      try {
        const response = await API.get(`/vehicle/${vehicleId}`);
        setViolations(response.data);
      } catch (err) {
        console.error("Failed to fetch fines");
      }
    };
    fetchFines();
  }, []);

  return (
    <div className="App">
      <header style={{ padding: '20px', background: '#282c34', color: 'white' }}>
        <h1>Campus Fine Portal</h1>
      </header>
      <main>
        {/* Pass your Test ID here */}
        <FineList vehicleId="TEST-VHC-01" />
      </main>
    </div>
  );
}

export default App;