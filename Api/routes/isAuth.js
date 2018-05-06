const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    req.isAuthenticated() ? res.json({status: "Success"}) : res.status(403).json({status: "Error"});
});

module.exports = router;