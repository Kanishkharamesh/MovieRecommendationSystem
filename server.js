import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

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
    is2FAEnabled: { type: Boolean, default: false },
    language: { type: String, default: 'English' },
    region: { type: String, default: 'US' },
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

// Middleware to authenticate JWT
const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Extract token from Authorization header
    if (!token) return res.status(401).send('Access Denied');

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).send('Invalid or expired token');
        req.user = user; // Store the decoded user data in the request object
        next();
    });
};

// Validate email format
const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

// Validate password strength
const validatePassword = (password) => password.length >= 8;

// PUT route for updating account settings
app.put('/account-settings', authenticateJWT, async (req, res) => {
    const { email, newPassword, is2FAEnabled, language, region } = req.body;
    const userId = req.user.id; // Get the user ID from the JWT token

    // Input validation
    if (email && !validateEmail(email)) {
        return res.status(400).send('Invalid email format');
    }

    if (newPassword && !validatePassword(newPassword)) {
        return res.status(400).send('Password must be at least 8 characters long');
    }

    try {
        // Prepare data for update
        const updateData = { email, is2FAEnabled, language, region };

        // If password is being updated, hash it
        if (newPassword) {
            updateData.password = await bcrypt.hash(newPassword, 10);
        }

        // Update user data in the database
        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
        if (!updatedUser) {
            return res.status(404).send('User not found');
        }

        res.send('Account settings updated successfully');
    } catch (err) {
        console.error('Error updating account settings:', err);
        res.status(500).send('Error updating account settings: ' + err.message);
    }
});

// Start the Server
app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});