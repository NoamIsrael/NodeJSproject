const jwt = require('jsonwebtoken');

// User login
router.post('/users/login', async (req, res) => {
    try {

        const token = jwt.sign(
            {
                _id: user._id,
                isBusiness: user.isBusiness,
                isAdmin: user.isAdmin,
            },
            'your-secret-key',
            { expiresIn: '1h' }
        );

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});