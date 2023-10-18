const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const adminLayout = '../views/layouts/admin';
const jwtSecret = process.env.JWT_SECRET;

/**
 * GET
 * Admin - Login Page
 */

/**
 * GET
 * Check  Login
 */

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if(!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' })
  }
}

router.get('/admin', async (req, res) => {
    try {
      const locals = {
        title: 'Admin',
        description: "Learning and Development Admin"
      }
  
      res.render("admin/index", { locals, layout: adminLayout });

    } catch (error) {
      console.log(error);
    }
  });

  /**
 * POST
 * Admin - Check Login
 */

  router.post('/admin', async (req, res) => {
    try {
        const { username, password } = req.body;


        const user = await User.findOne( { username });

        if(!user) {
          return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid) {
          return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, jwtSecret);
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/dashboard');
      
    } catch (error) {
      console.log(error);
    }
  });


    /**
 * GET
 * Admin - Dashboard
 */
  router.get('/dashboard', authMiddleware, async (req, res) => {

    try {
      const locals = {
        title: 'Dashboard',
        description: 'Manage all the Call Centre Process'
      }

      const data = await Post.find();
      res.render('admin/dashboard', {
        locals,
        data,
        layout: adminLayout
      });
    } catch (error) {
      console.log(error);
    }
  });


  /**
 * GET
 * Admin - Create New Post/Process  
 */


  router.get('/add-post',authMiddleware, async (req, res) => {
    try {
      const locals = {
        title: 'Add New Process',
        description: 'New Process addition Page'
      }

      const data = await Post.find();
      res.render('admin/add-post', {
        locals, layout: adminLayout
      })
    } catch (error) {
      console.log(error);
    }
  });


  /**
 * POST
 * Admin - Create New Post/Process  
 */

  router.post('/add-post',authMiddleware, async (req, res) => {
    try { 

      try {
        const newPost = new Post({
          title: req.body.title,
          body: req.body.body
        });

        await Post.create(newPost);
        res.redirect('/dashboard');

      } catch (error) {
       console.lg(error) 
      }

    } catch (error) {
      console.log(error);
    }
  });


  /**
 * GET
 * Admin - Create New Post/Process  
 */

    router.get('/edit-post/:id',authMiddleware, async (req, res) => {
      try {

        const locals = {
          title: 'Edit a Process',
          description: 'Make Updated Changes to the process'
        }

        const data = await Post.findOne({ _id: req.params.id })
  
        res.render('admin/edit-post', {
          locals,
          data,
          layout: adminLayout
        });
  
      } catch (error) {
        console.log(error);
      }
    })

    

  
  /**
 * PUT
 * Admin - Create New Post/Process  
 */

  router.put('/edit-post/:id',authMiddleware, async (req, res) => {
    try {
      await Post.findByIdAndUpdate(re.params.id, {
        title: req.body.body,
        body: req.bofy.body,
        updatedAt: Date.now()
      });

      res.redirect(`/edit-post/${req.params.id}`);

    } catch (error) {
      console.log(error);
    }
  })



  /**
 * POST
 * Admin - Register
 */

  router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        try {
          const user = await User.create({ username, password: hashedPassword })
          res.status(201).json({ message: 'User Created Successfully.', user })
        } catch (error) {
          if(error.code === 11000) {
            res.status(409).json({ message: 'User already in use.' })
          }
          res.status(500).json({ message: 'Internal Server Error.' })
        }
    } catch (error) {
      console.log(error);
    }
  });

module.exports = router;