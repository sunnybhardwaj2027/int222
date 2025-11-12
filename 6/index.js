const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Welcome to my first server!');
});

app.listen(port, () => {
  console.log(`Server is running and listening on http://localhost:${port}`);
});