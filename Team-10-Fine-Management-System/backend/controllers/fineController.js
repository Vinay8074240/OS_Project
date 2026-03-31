const db = require('../config/db');

const issueViolation = async (req, res) => {
  const { vehicle_id, violation_type, description } = req.body;

  try {
    // 1. Get current offense count from Vehicles table
    const [vehicles] = await db.execute(
      'SELECT offense_count FROM vehicles WHERE id = ?', 
      [vehicle_id]
    );

    if (vehicles.length === 0) return res.status(404).send("Vehicle not found");

    const currentCount = vehicles[0].offense_count;
    const newCount = currentCount + 1;

    // 2. Rule Logic: If this is the 4th or more violation, fine is 500
    // (Note: offense_count starts at 0, so 3 existing + 1 new = 4)
    const fineAmount = newCount >= 4 ? 500.00 : 0.00;
    const status = fineAmount > 0 ? 'pending' : 'waived';
    const isWarning = fineAmount === 0;

    // 3. Insert into Violations table (Team 3's schema)
    const [result] = await db.execute(
      `INSERT INTO violations 
      (vehicle_id, violation_type, description, fine_amount, fine_status, warning_issued, created_at) 
      VALUES (?, ?, ?, ?, ?, ?, NOW())`,
      [vehicle_id, violation_type, description, fineAmount, status, isWarning]
    );

    // 4. Increment the offense count in Vehicles table
    await db.execute(
      'UPDATE vehicles SET offense_count = ? WHERE id = ?',
      [newCount, vehicle_id]
    );

    res.json({ 
      message: "Violation Recorded", 
      fine: fineAmount, 
      offense_number: newCount 
    });

  } catch (err) {
    console.error(err);
    res.status(500).send("Database Error");
  }
};

// Update Payment (UPI Logic)
const updatePayment = async (req, res) => {
  const { id } = req.params; // violation UUID
  const { transaction_id } = req.body;

  try {
    await db.execute(
      "UPDATE violations SET fine_status = 'paid', transaction_id = ? WHERE id = ?",
      [transaction_id, id]
    );
    res.json({ success: true, message: "Payment status updated to Paid" });
  } catch (err) {
    res.status(500).send("Update failed");
  }
};

const getViolationsByVehicle = async (req, res) => {
  const { vehicle_id } = req.params;
  try {
    const [rows] = await db.execute(
      'SELECT * FROM violations WHERE vehicle_id = ? ORDER BY created_at DESC', 
      [vehicle_id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Database query failed" });
  }
};

module.exports = { 
    issueViolation, 
    updatePayment, 
    getViolationsByVehicle
};