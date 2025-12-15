const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/hooksDB')
    .then(() => console.log("Connected"))
    .catch(err => console.log(err));

/* ---------------- SCHEMAS ---------------- */

// POST Schema
const postSchema = new mongoose.Schema({
    title: String,
    author: mongoose.Schema.Types.ObjectId
});
const Post = mongoose.model('Post', postSchema);

// USER Schema
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

/* ---------------- MIDDLEWARE ---------------- */

// A. Pre-save: Hash Password
userSchema.pre('save', async function () {
    console.log("\n[MW] Pre-save hook triggered. Hashing Password...");
    this.password = `###${this.password}###`;
});

// B. Pre-delete: Cascade Delete Posts
userSchema.pre(
    'deleteOne',
    { document: true, query: false },
    async function () {
        console.log(`\n[MW] Pre-delete hook triggered. Removing posts for user ${this._id}`);
        await Post.deleteMany({ author: this._id }); // ✅ FIXED
    }
);

const User = mongoose.model('User', userSchema);

/* ---------------- RUN LOGIC ---------------- */

async function run() {
    try {
        console.log("--- Creating User ---");
        const newUser = new User({
            username: "SecurityExpert",
            password: "mySuperSecretPassword123"
        });

        await newUser.save();
        console.log("User Saved. DB Password is:", newUser.password);

        console.log("\n--- Creating Posts ---");
        await Post.create([
            { title: "Security 101", author: newUser._id },
            { title: "Hashing Secrets", author: newUser._id }
        ]);
        console.log("Created 2 posts for this User.");

        console.log("\n--- Deleting User ---");
        await newUser.deleteOne();

        const remainingPosts = await Post.find({ author: newUser._id });
        console.log(`\nRemaining posts for this user: ${remainingPosts.length}`);
        // should be 0

    } catch (e) {
        console.error(e);
    } finally {
        mongoose.connection.close();
    }
}

run();
