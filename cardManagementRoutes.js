const express = require('express');
const router = express.Router();
const Card = require('./models/card');
const middleware = require('./middleware');
const { authorize } = require('./middleware');

// Get all cards
router.get('/cards', async (req, res) => {
    try {
        const cards = await Card.find({ isDeleted: false });
        res.status(200).json(cards);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get cards for a specific user
router.get('/cards', async (req, res) => {
    try {
        const userId = req.user._id;
        const cards = await Card.find({ userId, isDeleted: false });
        res.status(200).json(cards);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get card by ID
router.get('/cards/:id', async (req, res) => {
    try {
        const cardId = req.params.id;
        const card = await Card.findById(cardId);

        if (!card || card.isDeleted) {
            return res.status(404).json({ error: 'Card not found' });
        }

        res.status(200).json(card);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Create a new card
router.post('/cards', async (req, res) => {
    try {
        const { title, content } = req.body;
        const userId = req.user._id;

        const newCard = new Card({
            title,
            content,
            userId,
        });

        await newCard.save();
        res.status(201).json({ message: 'Card created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update card
router.put('/cards/:id', async (req, res) => {
    try {
        const cardId = req.params.id;
        const userId = req.user._id;
        const { title, content } = req.body;

        const card = await Card.findById(cardId);

        if (!card || card.isDeleted) {
            return res.status(404).json({ error: 'Card not found' });
        }

        if (card.userId.toString() !== userId.toString()) {
            return res.status(403).json({ error: 'Not authorized to update this card' });
        }

        card.title = title;
        card.content = content;
        await card.save();

        res.status(200).json({ message: 'Card updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Soft delete card
router.patch('/cards/:id', async (req, res) => {
    try {
        const cardId = req.params.id;
        const userId = req.user._id;

        const card = await Card.findById(cardId);

        if (!card || card.isDeleted) {
            return res.status(404).json({ error: 'Card not found' });
        }

        if (card.userId.toString() !== userId.toString()) {
            return res.status(403).json({ error: 'Not authorized to delete this card' });
        }

        card.isDeleted = true;
        await card.save();

        res.status(200).json({ message: 'Card deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Permanently delete card
router.delete('/cards/:id', async (req, res) => {
    try {
        const cardId = req.params.id;

        const card = await Card.findByIdAndDelete(cardId);

        if (!card || card.isDeleted) {
            return res.status(404).json({ error: 'Card not found' });
        }

        res.status(200).json({ message: 'Card deleted permanently' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;