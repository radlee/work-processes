const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

/**
 * GET
 * Admin - Kiosks List
 */
router.get('/active-kiosks', (req, res) => {

    res.render('active-kiosks', { currentRoute: '/active-kiosks'});
 
});



router.get('/about', (req, res) => {
  res.render('about', { currentRoute: '/about'});
});

/**
 * GET
 * HOME
 */

router.get('', async(req, res) => {

    try {
        const locals = {
            title: 'Flash Call Centre Processes',
            description: 'Find relevant information related to all Centre Processes and Queries Here'
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

        res.render('index', { 
            locals, 
            data,
            current: page,
            nextPage: hasNextPage ? nextPage : null,
            currentRoute: '/'
        });
    } catch (error) {
        console.log(error)
    }
});


/**
 * GET
 * Post: id
 */

router.get('/post/:id', async (req, res) => {
    try {
      let slug = req.params.id;
  
      const data = await Post.findById({ _id: slug });
  
      const locals = {
        title: data.title,
        description: 'The complete guide to processes'
      }
  
      res.render('post', { 
        locals,
        data,
        currentRoute: `/post/${slug}`,
      });
    } catch (error) {
      console.log(error);
    }
  
  });

/**
 * POST
 * Post - searchTerm
 */
router.post('/search', async (req, res) => {
  try {
    const locals = {
      title: 'Process Search',
      description: "Try and search something.."
    }

    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const data = await Post.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChar, 'i') }},
        { body: { $regex: new RegExp(searchNoSpecialChar, 'i') } }
      ]
    })

    res.render("search", {
      data,
      locals,
      currentRoute: '/'
    });
  } catch (error) {
    console.log(error);
  }
});


/**
 * GET
 * ABOUT
 */

router.get('/about', (req, res) => {
    res.render('about', { currentRoute: '/about'});
});


module.exports = router;