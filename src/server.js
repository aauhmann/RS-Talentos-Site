const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send("Servidor funcionando");
});

app.listen(3000, () => {
    console.log("Rodando em http://localhost:3000");
});

app.get('/api/usuario', (req, res) => {
    res.json({
        id: 599256
    });
});