const express = require('express');
const router = express.Router();

//Routes
router.get('', (req, res) => {

    const locals = {
        title: 'GSSC Processes Blog',
        description: 'Call Centre Processes Simplified'
    }
    res.render('index', { locals });
});

router.get('/about', (req, res) => {
    res.render('about');
});

module.exports = router;