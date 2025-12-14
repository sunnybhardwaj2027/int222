const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/relationshipsDB')
    .then(() => console.log("Connected"))
    .catch(err => console.log(err));

// --- 1. The USER Model (The parent) ---

const userSchema = new mongoose.Schema({
    username: String,
    email: String
});

const User = mongoose.model('User', userSchema);

// --- 2. The POST Model (The Child) ---

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    // THE MAGIC LINE:
    author: {
        type: mongoose.Schema.Types.ObjectId, // It's an ID
        ref: 'User' // It reference the 'User' model
    }
});

const Post = mongoose.model('Post', postSchema);

async function run() {
    try {
        // A. Create a User
        // we generally check if user exists first, but for this demo we create new
        const newUser = await User.create({
            username: "CodeMaster",
            email: "Master@dev.com"
        });

        console.log("1. User Created:", newUser._id);

        // B. Create a Post linked to the User
        const newPost = await Post.create({
            title: "How to Master Mongoose",
            content: "Stop treating it like SQL...",
            author: newUser._id // <--- Linking the ID here
        });

        console.log("2. Post Created (Look at 'author' field):");
        console.log(newPost);
        // Output will show: Author : new ObjectId("...")

        // C. The Magic: POPULATE
        // we want the Post, but we want the 'author' field to be the actual User Object, not just an ID.
        const foundPost = await Post.findOne( { title: "How to Master Mongoose" } )
            .populate('author'); // <--- Tells Mongoose to go fetch the User data

        console.log("\n3. Post after Populate (Look at 'author' field):");
        console.log(foundPost);

        // accessing the data
        console.log("\nAuthor's Name: ", foundPost.author.username);

        const efficientPost = await Post.findOne( { title: "How to Master Mongoose" })
            .populate('author', 'username email -_id');

        console.log(efficientPost);

        console.log(efficientPost.author.email);

    } catch (e) {
        console.log(e);
    }
}

run();