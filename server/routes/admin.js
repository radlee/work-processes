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
  router.get('/dashboard', async (req, res) => {
    res.render('admin/dashboard');
  });

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