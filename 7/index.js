const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Welcome to my first server!');
});

app.get('/user', (req, res) => {
  const userInfo = {
    name: 'Alex',
    age: 25
  };
  res.json(userInfo);
});

app.listen(port, () => {
  console.log(`Server is running and listening on http://localhost:${port}`);
});