const express = require('express');
const path = require('path');
const courseRoutes = require('./routes/courseRoutes');

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, '../frontend')));

app.use('/api/courses', courseRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(3000, () => {
    console.log("Rodando em http://localhost:3000");
});

app.get('/api/usuario', (req, res) => {
    res.json({
        id: 599256
    });
});