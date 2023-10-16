const express = require('express');
const router = express.Router();

//Routes
router.get('', (req, res) => {
    res.send("Hello San")
});

module.exports = router;