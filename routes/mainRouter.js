const express = require('express');
const { homepage } = require('../controllers/studentController');

//init router 
const router = express.Router();

//create router
router.get('/', homepage)


module.exports = router;