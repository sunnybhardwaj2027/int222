const express = require('express');
const app = express();
const port = 3000;

const mainRoutes = require('./route.js');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(mainRoutes);

app.use((req, res) => {
    res.status(404).send('<h1>404 not found</h1>');
});

app.listen(port, () => {
    console.log(`express server is running on http://localhost:${port}`);
});
