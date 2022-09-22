
const express = require('express');
const { getAllStudent, createStudent, singleShow, showEditPage , studentDataStore, deleteStudent, updateStudent, unverifiedStudent, verifyAccount, verifyByPhone, singlePhonePage, sendSMSFrom, otpPage, verifyToken, verifyWithPhone, sentSMSPhone} = require('../controllers/studentController');
const path = require('path');
const studentPhotoMulter = require('../middleware/studentMulter');

//init router
const router = express.Router();




//create router
router.get('/', getAllStudent);
router.get('/unverified_student', unverifiedStudent);
//verify with sms
router.post('/unverified_student', sentSMSPhone);
router.get('/verify/:token', verifyToken)
router.get('/create', createStudent);
router.post('/create',studentPhotoMulter, studentDataStore);
//verify with sms
router.get('/verify_phone/:id', verifyWithPhone);

router.get('/delete/:id', deleteStudent);
router.post('/update/:id',studentPhotoMulter, updateStudent)
router.get('/edit/:id', showEditPage);
router.get('/:id', singleShow);


//export router
module.exports = router;