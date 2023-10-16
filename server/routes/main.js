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








/**
 * GET
 * Post: id
 */



// -------------------Code Review ------------------

// router.get('/post/:id', async (req, res) => {
//     try {
//         const locals = {
//             title: 'GSCC Processes',
//             description: 'The complete guide to processes'
//         }

//         let slug = req.params.id;

//         const data = await Post.findById({ _id: slug  });
//         res.render('index', { locals, data });

//     } catch (error) {
//         console.log(error)
//     }
// })
// ----------------------------------------------------------------


router.get('/post/:id', async (req, res) => {
    try {
      let slug = req.params.id;
  
      const data = await Post.findById({ _id: slug });
  
      const locals = {
        title: 'GSCC Processes',
        description: 'The complete guide to processes'
      }
  
      res.render('post', { 
        locals,
        data,
        currentRoute: `/post/${slug}`
      });
    } catch (error) {
      console.log(error);
    }
  
  });








router.get('/about', (req, res) => {
    res.render('about');
});





module.exports = router;