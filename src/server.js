const express = require('express');
const path = require('path');
const { execSync } = require('child_process');
const courseRoutes = require('./routes/courseRoutes');

const app = express();

app.use(express.json());

// Builds frontend API
console.log("Building frontend...");
execSync('npm run build', { cwd: path.join(__dirname, '../frontend'), stdio: 'inherit' });
console.log("Frontend build completed");

app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.use('/api/courses', courseRoutes);

// Serves the html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// Prints in the terminal when server is running
app.listen(3000, () => {
    console.log("\nRunning on http://localhost:3000");
});