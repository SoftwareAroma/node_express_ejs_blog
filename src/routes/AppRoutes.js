const express = require('express');
const appController = require('../controllers/appController');

const router = express.Router();


router.get('/', appController.home_page);
router.get('/about', appController.about_page);

module.exports = router;
