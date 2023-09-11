router.post('/users/reset-password', async (req, res) => {
    try {
        const { email } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Generate a unique reset token
        const resetToken = generateResetToken();

        // Save the reset token and expiration date in the user document
        user.resetToken = resetToken;
        user.resetTokenExpiration = Date.now() + 3600000;
        const { authorizeAdmin, authorizeUser } = require('./authMiddleware');

        await user.save();

        // Send the reset token to the user's email
        sendResetEmail(user.email, resetToken);

        res.status(200).json({ message: 'Password reset instructions sent to your email' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});