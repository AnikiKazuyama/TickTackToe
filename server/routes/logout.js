const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    req.logout();
    res.clearCookie('connect.sid', {path: '/'}).json({status: "success"});
});

module.exports = router;