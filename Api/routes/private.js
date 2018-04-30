const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    req.isAuthenticated() ? res.send('Ты вошел в меня') : res.status(403).send('Непутю');
});

module.exports = router;