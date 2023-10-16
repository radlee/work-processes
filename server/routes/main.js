const express = require('express');
const router = express.Router();
const Post = require('../models/Post');



/**
 * GET
 * HOME
 */

//Routes
router.get('', async(req, res) => {

    try {
        const locals = {
            title: 'GSSC Processes Blog',
            description: 'Call Centre Processes Simplified'
        }

        let perPage = 10;
        let page = req.query.page || 1;

        const data = await Post.aggregate([ { $sort: { createdAt: -1 } } ])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec();

        const count = await Post.count();
        const nextPage = parseInt(page) + 1;
        const hasNextPage = nextPage <= Math.ceil(count / perPage);

        // const data = await Post.find();
        res.render('index', { 
            locals, 
            data,
            current: page,
            nextPage: hasNextPage ? nextPage : null
        });
    } catch (error) {
        console.log(error)
    }
});






router.get('/about', (req, res) => {
    res.render('about');
});



/**
 * GET
 * Post: id
 */


router.get('/post/:id', async (req, res) => {
    try {
        const locals = {
            title: 'GSCC Processes',
            description: 'The complete guide to processes'
        }

        let slug = req.params.id;

        const data = await Post.findById({ _id: slug  });
        res.render('index', { locals, data });

    } catch (error) {
        console.log(error)
    }
})





module.exports = router;