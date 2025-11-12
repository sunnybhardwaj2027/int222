const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

app.post('/submit-data', (req, res) => {
  
  const name = req.body.user_name;
  const email = req.body.user_email;

  console.log('Received data:');
  console.log('Name:', name);
  console.log('Email:', email);

  res.send(`Thank you, ${name}! We received your email (${email}).`);
});

app.listen(port, () => {
  console.log(`Server is running and listening on http://localhost:${port}`);
});