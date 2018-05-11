const models = require('../db/index');
const express = require('express');
const router = express.Router();

router.post('/create', (req, res) => {
    models.user
        .create({ name: req.body.name, email: req.body.email, password: req.body.password })
        .then(() => res.json({status: "Success"}))
        .catch( e => res.status(400).json({status: "Error"}))   
    
})

router.get('/getCurrent', (req, res) => {
    console.log(req.user);
    if(req.isAuthenticated())
        res.json({
            status: "Success",
            user: req.user.getPublicData()
        });
    else res.json({ status: "Error" });
})

module.exports = router;