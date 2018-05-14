const models = require('../db/index');
const express = require('express');
const router = express.Router();

router.post('/create', (req, res) => { 
    models.user
        .create({ name: req.body.name, email: req.body.email, password: req.body.password })
        .then(() => res.json({status: "success"}))
        .catch( e => res.json({status: "error", reason: e.errors[0].path}))
    
})

router.get('/getCurrent', (req, res) => {
    if(req.isAuthenticated())
        res.json({
            status: "success",
            user: req.user.getPublicData()
        });
    else res.json({ status: "error" });
})

module.exports = router;