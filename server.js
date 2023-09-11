const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cardRoutes = require('./cardRoutes');
const userRoutes = require('./userRoutes');
const Cards = require('./models/card');
const authMiddleware = require('./authMiddleware');
const resetPasswordRoute = require('./resetPasswordRoute');
const userPasswordRouter = require('./userPassword.js');
const cardManagementRoutes = require('./cardManagementRoutes');
const loggerMiddleware = require('./loggerMiddleware');


// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(bodyParser.json());

const App = express();

mongoose.connect('mongodb://localhost:27017/myapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(loggerMiddleware);

app.use(express.json());

app.use(authMiddleware.authenticateUser);

app.use('/api/cards', cardRoutes);

app.use('/api/cards', cardManagementRoutes);

const Port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const router = express.Router();
const { authenticateUser, authorizeAdmin, authorizeUser } = require('./middleware');

router.get('/admin-only', authenticateUser, authorizeAdmin, (req, res) => {

});


router.get('/user-only', authenticateUser, authorizeUser, (req, res) => {

});

module.exports = router;


const authorize = (req, res, next) => {
    try {

    } catch (error) {
        res.status(401).json({ error: 'Unauthorized' });
    }
};

app.get('/users', authorize, async (req, res) => {

});

app.put('/users/:id', authorize, async (req, res) => {

});


app.use(express.static('public'));

app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

// Database connection
mongoose.connect('mongodb://localhost/myapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// User and Card schemas
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String,
    isBusiness: Boolean,
    isAdmin: Boolean,
});

userSchema.pre('save', async function (next) {
    const user = this;

    if (!user.isModified('password')) return next();

    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    next();
});

const User = mongoose.model('User', userSchema);

const cardSchema = new mongoose.Schema({
    title: String,
    content: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Card = mongoose.model('Card', cardSchema);

module.exports = { User, Card };
// Routes for user and card management
const { Users, cards } = require('./models');

const app = express();
const dbURL = 'mongodb://localhost:27017/myapp';
mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.connect('mongodb://localhost:27017/myapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(express.json());

app.use(authMiddleware.authenticateUser);

app.post('/api/users/login', require('./userLoginRoute'));

app.use('/api', userRoutes);

app.use('/api', cardRoutes);

app.use('/api', resetPasswordRoute);

app.use('/api/reset-password', userPasswordRouter);

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


// User registration
app.post('/users', async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// User login
app.post('/users/login', async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get all users
app.get('/users', async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get user by ID
app.get('/users/:id', async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update user's isBusiness status
app.put('/users/:id', async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete user 
app.delete('/users/:id', async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Handle 404 errors
app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Configure the Google strategy
passport.use(
    new GoogleStrategy(
        {
            clientID: 'your-client-id',
            clientSecret: 'your-client-secret',
            callbackURL: '/auth/google/callback',
        },
        (accessToken, refreshToken, profile, done) => {

        }
    )
);

app.use(passport.initialize());

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {

    res.redirect('/');
});