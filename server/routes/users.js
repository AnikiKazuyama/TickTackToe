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
    if(req.isAuthenticated())
        res.json({
            status: "Success",
            user: getPublicData(req.user)
        });
    else res.json({ status: "Error" });
})

getPublicData = (user) => {
    return ({
        id: user.id,
        name: user.name,
        email: user.email
    });
}

module.exports = router;