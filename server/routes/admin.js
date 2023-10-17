const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');

const adminLayout = '../views/layouts/admin';

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
        console.log(req.body)
      res.redirect('/admin')
    } catch (error) {
      console.log(error);
    }
  });

module.exports = router;