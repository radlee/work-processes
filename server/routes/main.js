const express = require('express');
const router = express.Router();
const Post = require('../models/Post');



/**
 * GET
 * HOME
 */

//Routes
router.get('', async(req, res) => {

    const locals = {
        title: 'GSSC Processes Blog',
        description: 'Call Centre Processes Simplified'
    }
    try {
        const data = await Post.find();
        res.render('index', { locals, data });
    } catch (error) {
        console.log(error)
    }
});






router.get('/about', (req, res) => {
    res.render('about');
});


// function insertPostData () {
//     Post.insertMany([
//         {
//             title: 'Building a Blog',
//             body: 'A very short story'
//         },
//         {
//             title: 'User Not Permitted to LogIn',
//             body: 'Processes for Device related issues'
//         },
//         {
//             title: 'Adding a Beneficiary',
//             body: 'Propper structure for adding a beneficiary.'
//         },
//         {
//             title: 'Ria Sikhona',
//             body: 'What is Ria Sikhona'
//         },
//     ])
// }

// insertPostData()



module.exports = router;