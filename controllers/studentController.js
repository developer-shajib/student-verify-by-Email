const { readFileSync, writeFileSync, readFile } = require('fs');
const path = require('path');
const buklSMSBd = require('../utility/bulkSmsBd');
const studentVerified = require('../utility/sendMail');
const { verifyEmail } = require('../utility/sendMail');
const twilioSMS = require('../utility/twilioSMS');


//verified student page
const getAllStudent = (req,res)=>{
    const student = JSON.parse(readFileSync(path.join(__dirname,'../db/student.json')));
    const verified = student.filter(data => data.isVerified == true);

    res.render('student/index',{student : verified})
}

//unverified student page
const unverifiedStudent = (req,res)=>{
    const student = JSON.parse(readFileSync(path.join(__dirname,'../db/student.json')));
   const unverified = student.filter(data => data.isVerified == false);
    res.render('../views/student/unVerified',{student : unverified})
}


// create student
const createStudent = (req,res)=>{
    res.render('../views/student/create')
}
const singleShow = (req,res)=>{
    const student = JSON.parse(readFileSync(path.join(__dirname,'../db/student.json')));
    const {id} = req.params;
    const single_data = student.find(data => data.id == id);

    res.render('../views/student/singleShow',{
        data : single_data
    })
}

const studentDataStore = async (req,res)=>{
    const student = JSON.parse(readFileSync(path.join(__dirname,'../db/student.json')));
    //get all data
    const {id,name,email,cell,location,photo} = req.body;

    //get last id
    let last_id = 1;
    if(student.length > 0){
    last_id = student[student.length -1].id +1;
    }
    //create token 
    const token  = Date.now() +'_'+ Math.floor(Math.random()*10000);
    //send mail
    await studentVerified(email,`Verify your Account`,{name,email,cell,token});

    // //sent message with twilio
    // await twilioSMS(cell,`Hi ${name}.Your twilio sms sent.`)

    // //sent sms with bulksmsBd
    // await buklSMSBd(cell,`Hi ${name}.Your BulkSmsBd msg sent.`)

    // //add new data
    student.push({id : last_id,
        name,email,cell,location,
        photo : req.file ? req.file.filename : 'avatar.png',
        isVerified : false,
        token : token
    });

    //now write file data to json db
    writeFileSync(path.join(__dirname,'../db/student.json'),JSON.stringify(student));


    res.redirect('/student')
}

const deleteStudent = (req,res) =>{
    const student = JSON.parse(readFileSync(path.join(__dirname,'../db/student.json')));
    const {id} = req.params;

    const updateStudentList = student.filter(data => data.id != id);
    writeFileSync(path.join(__dirname,'../db/student.json'),JSON.stringify(updateStudentList));
    res.redirect('/student')
}

const showEditPage = (req,res)=>{
    const student = JSON.parse(readFileSync(path.join(__dirname,'../db/student.json')));
    const {id} = req.params;
    const edit_data = student.find(data => data.id == id);
    res.render('../views/student/edit',{ data : edit_data})
}

const updateStudent = (req,res)=>{
    const student = JSON.parse(readFileSync(path.join(__dirname,'../db/student.json')));
    const {id} = req.params;
    const {name,email,cell,location} = req.body;
    
    student[student.findIndex(data => data.id == id)] = {
        ...student[student.findIndex(data => data.id == id)],
        name,email,cell,location
    }

    writeFileSync(path.join(__dirname,'../db/student.json'),JSON.stringify(student));

    res.redirect('/student')

}

//verify email token
const verifyToken = (req,res)=>{
    const student = JSON.parse(readFileSync(path.join(__dirname,'../db/student.json')));
    const {token} = req.params;
    student[student.findIndex(data=>data.token == token)] = {
       ...student[student.findIndex(data=>data.token == token)],
       isVerified : true,
       token : null 
    }
    writeFileSync(path.join(__dirname,'../db/student.json'),JSON.stringify(student));
    res.redirect('/student')
}

//verify with phone page
const verifyWithPhone  = async (req,res)=>{
    //phone verified

    res.render('student/verifyByPhone')
}

//sent sms page
const sentSMSPhone =(req,res)=>{
    const {cell,sms_page_id} = req.body;
    console.log(req.body);
    //send sms
    
    res.redirect('student/verify_phone/3')
}

//home page router
const homepage = (req,res) =>{
    res.render('student/homePage')
}



module.exports = {
    getAllStudent,
    createStudent,
    singleShow,
    showEditPage,
    studentDataStore,
    deleteStudent,
    updateStudent,
    unverifiedStudent,
    verifyToken,
    verifyWithPhone,
    sentSMSPhone,
    homepage
}