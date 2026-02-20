// ...existing code...
const express = require('express');
const cors = require('cors');
const courseRoutes = require('./routes/courseRoutes');

const app = express();

app.use(cors({
  origin: 'https://curriculo-ecp.netlify.app',
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Backend rodando!' });
});

// API routes
app.use('/api/courses', courseRoutes);

// Render port
const PORT = process.env.PORT || 3000;

// Prints in the terminal when server is running
app.listen(PORT, () => {
  console.log(`\nRunning on http://localhost:${PORT}`);
});