const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.status(200).send('Home Page');
});

app.get('about', (req, res) => {
    res.status(200).json({message : 'About Page'});
});

app.use((req, res) => {
    res.status(404).send('Page Not Found');
});

