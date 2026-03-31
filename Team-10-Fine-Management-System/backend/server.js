const express = require('express');
const cors = require('cors');
const fineRoutes = require('./routes/fineRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/fines', fineRoutes);
app.get('/', (req, res) => {
  res.send('Team 10 Fine Management API is Running!');
});
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));