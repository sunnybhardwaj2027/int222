// express-validator => so far, we have built routes that accepts data(like a login route). but we have problem 'we trust the user too much'

/*

what if a user sends 
a email that isn't email('banana')
a password that is 1 character long ('a)
an empty username

if you save this bad data to your database, your app will break. you need to validata the data before you use it

*/

// express-validator is a popular third party middleware library for express that makes validataion easy 

/*

Analogy: The Club Bouncer

Without Validator: Your route is an open door. Anyone (and anything) can walk in.

With Validator: You put a bouncer at the door with a checklist.

"Is your email valid?" (Check)

"Is your password at least 5 chars?" (Check)

If they pass, they enter the route. If they fail, they get kicked out immediately.

*/

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

// after this go to route.js
