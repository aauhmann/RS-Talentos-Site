// ...existing code...
const express = require('express');
const courseRoutes = require('./routes/courseRoutes');

const app = express();

app.use(express.json());

// API routes
app.use('/api/courses', courseRoutes);

// Render port
const PORT = process.env.PORT || 3000;

// Prints in the terminal when server is running
app.listen(PORT, () => {
  console.log(`\nRunning on http://localhost:${PORT}`);
});