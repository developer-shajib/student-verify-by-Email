const multer = require('multer');
const path = require('path');


//multer config
const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,path.join(__dirname,'../public/images/students/'))
    },
    filename : (req,file,cb) => {
        cb(null,file.originalname);
    }
});

const studentPhotoMulter = multer({
    storage
}).single('student_photo');


module.exports = studentPhotoMulter;