const express = require('express');
const router = express.Router();

// Add the missing function to this curly bracket list:
const { 
    issueViolation, 
    updatePayment, 
    getViolationsByVehicle 
} = require('../controllers/fineController');

// Triggered by Team 8
router.post('/issue', issueViolation);

// Triggered by Team 10 Frontend (UPI Page)
router.put('/pay/:id', updatePayment);
// Add this to see something in the browser at http://localhost:5000/api/fines/
router.get('/', (req, res) => {
    res.json({ message: "Team 10 Fine API is Active", rules: "Violations > 3 = ₹500" });
});

router.get('/vehicle/:vehicle_id', getViolationsByVehicle);
module.exports = router;