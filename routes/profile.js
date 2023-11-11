const express = require('express');
const router = express.Router();

// Sample user data (replace with your actual user data)
const users = [
    { id: 1, username: 'user1', bio: 'Bio of user 1', profilePicture: 'user1.jpg' },
    { id: 2, username: 'user2', bio: 'Bio of user 2', profilePicture: 'user2.jpg' },
    { id: 3, username: 'user3', bio: 'Bio of user 3', profilePicture: 'user3.jpg' },
];

// Profile Page
router.get('/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find((u) => u.id === userId);

    if (!user) {
        return res.status(404).send('User not found');
    }

    res.render('profile', { user });
});

module.exports = router;