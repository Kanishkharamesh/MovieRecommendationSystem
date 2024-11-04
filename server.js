import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB (adjust "UserInfo" to your MongoDB Compass database name)
mongoose.connect('mongodb://localhost:27017/UserDetails', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Define User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },  // Store plain-text password (not secure)
});

const User = mongoose.model('User', userSchema);

// Signup Endpoint
app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    // Validate user input
    if (!username || !email || !password) {
        return res.status(400).send('All fields are required.');
    }

    // Store the password as plain text (insecure)
    const user = new User({ username, email, password });
 
    try {
        await user.save();
        res.status(201).send('User registered successfully');
    } catch (err) {
        console.error('Error during user registration:', err); // Log error for debugging
        if (err.code === 11000) {
            // Duplicate key error (user already exists)
            return res.status(400).send('User already exists');
        }
        res.status(500).send('Error registering user: ' + err.message);
    }
});

// Login Endpoint
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(401).send({ message: 'Invalid email or password' });
    }

    // Directly compare the plain-text password
    if (password === user.password) {
        const token = jwt.sign({ id: user._id }, 'secretkey', { expiresIn: '1h' });
        res.json({ token, username: user.username, email: user.email });
    } else {
        res.status(401).send({ message: 'Invalid email or password' });
    }
});

// Start the Server
app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});