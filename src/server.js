const express = require('express');
const cors = require('cors');
const courseRoutes = require('./routes/courseRoutes');

const app = express();

app.use(cors({
  origin: ['https://curriculo-ecp.netlify.app', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'DELETE'],
  credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Backend running!' });
});

// API routes
app.use('/api/courses', courseRoutes);

// Render port
const PORT = process.env.PORT || 3000;

// Prints in the terminal when server is running
app.listen(PORT, () => {
  console.log(`\nRunning on http://localhost:${PORT}`);
});