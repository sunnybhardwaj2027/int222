const mongoose = require('mongoose');
const User = require('./pro-user-model'); // Import your fancy Model

mongoose.connect('mongodb://localhost:27017/proDB')
    .then(() => console.log("Connected"))
    .catch(err => console.log(err))

async function run(){
    try{
        // 1. create a user (trying to break our rules)
        // if you change the 'role' to 'superuser', it will fail (Enum check)
        // if you change 'age' to 21, it will fail (custom check).
        const user = await User.create({
            username: "    TechLead    ", // will be treamed
            email: "Lead@Code.com", // will be lowercased
            role: "admin",
            age: 32,
            tags: ["developer", "backend"]
        });

        console.log("--- Created User ---");
        console.log(user);
        // Notice: 'createAt' exists automatically

        //2. Test Instance method
        console.log("\n--- Testing Methods ---");
        console.log("Is Senior Admin?", user.isSeniorAdmin()); // should be true
        console.log(user.sayHello());

        // 3. Test Static method
        console.log("\n--- Testing Statics ---");
        const findAllAdmins = await User.findAllAdmins();
        console.log(`Found ${findAllAdmins.length} admins.`);

    } catch (e) {
        // this catches our validation errors
        console.log("VALIDATION ERROR:", e.message);
    }
}

run();