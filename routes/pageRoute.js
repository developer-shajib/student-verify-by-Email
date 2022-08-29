
const express = require('express');
const { showHomePage, showStaffPage, showMenuPage, showLocationPage, showblogPage, showReservationPage, showNewsPage, showGalleryPage, showSingleblogPage } = require('../controllers/pageController');

//init router
const router = express.Router();

//router
router.get('/', showHomePage);
router.get('/staff', showStaffPage);
router.get('/menu', showMenuPage);
router.get('/location', showLocationPage);
router.get('/blog', showblogPage);
router.get('/reservation', showReservationPage);
router.get('/news', showNewsPage);
router.get('/gallery', showGalleryPage);
router.get('/blog/:id', showSingleblogPage);

//export router
module.exports = router;