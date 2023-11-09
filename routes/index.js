const express = require('express');
const router = express.Router();

// Database integration
const posts = [
    { id: 1, title: 'First Blog Post', content: 'This is the content of the first post.' },
    { id: 2, title: 'Second Blog Post', content: 'This is the content of the second post.' },
    { id: 3, title: 'Third Blog Post', content: 'This is the content of the third post.' }
];

// Routes
router.get('/', (req, res) => {
    res.render('index', { posts });
});

// Start the server
module.exports = router;