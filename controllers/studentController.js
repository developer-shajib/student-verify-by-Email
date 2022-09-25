const { readFileSync, writeFileSync, readFile } = require('fs');
const path = require('path');
const { DayInstance } = require('twilio/lib/rest/bulkexports/v1/export/day');
const buklSMSBd = require('../utility/bulkSmsBd');
const studentVerified = require('../utility/sendMail');
const { verifyEmail } = require('../utility/sendMail');
const twilioSMS = require('../utility/twilioSMS');
const vonAgeSMS = require('../utility/vonAgeSms');


//verified student page
const getAllStudent = (req,res)=>{
    const student = JSON.parse(readFileSync(path.join(__dirname,'../db/student.json')));
    const verified = student.filter(data => data.isVerified == true || data.phone_token == true);

    res.render('student/index',{student : verified})
}

//unverified student page
const unverifiedStudent = (req,res)=>{
    const student = JSON.parse(readFileSync(path.join(__dirname,'../db/student.json')));

   const unverified = student.filter(data => data.isVerified == false && data.phone_token == false || data.phone_token != true);
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

//verify with phone page
const verifyWithPhone  = async (req,res)=>{
    const student = JSON.parse(readFileSync(path.join(__dirname,'../db/student.json')));
    const phone_token = Math.floor(Math.random()*1000000);
    const phone_data = student.find(data =>data.id == req.params.id);

    //sent message with twilio
    await twilioSMS(phone_data.cell,`Hi ${phone_data.name}.Your OTP Code is ${phone_token}.`)

    student[student.findIndex(data => data.id == req.params.id)] = {
        ...student[student.findIndex(data => data.id == req.params.id)],
        phone_token : phone_token
    };

    writeFileSync(path.join(__dirname,'../db/student.json'), JSON.stringify(student));
    res.render('student/verifyByPhone');
}


//phone verify done
const phoneVerifyDone = (req,res)=>{
    const student = JSON.parse(readFileSync(path.join(__dirname,'../db/student.json')));
    const {otp} = req.body


    if(student[student.findIndex(data => data.phone_token == otp)]){

        student[student.findIndex(data => data.phone_token == otp)] = {
            ...student[student.findIndex(data => data.phone_token == otp)],
            phone_token : true
    }
    }


    writeFileSync(path.join(__dirname,'../db/student.json'),JSON.stringify(student));

    res.redirect('/student')
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

    // vonage sms
    // await vonAgeSMS(cell,`Hi ${name}.we sent you a vonage sms sent`)

    // //add new data
    student.push({id : last_id,
        name,email,cell,location,
        photo : req.file ? req.file.filename : 'avatar.png',
        isVerified : false,
        token : token,
        phone_token : false
    });

    //now write file data to json db
    writeFileSync(path.join(__dirname,'../db/student.json'),JSON.stringify(student));


    res.redirect('/student/unverified_student')
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
    const {token} = req.params
    
    student[student.findIndex(data=>data.token == token)] ={
        ...student[student.findIndex(data=>data.token == token)],
        isVerified : true
    };
    writeFileSync(path.join(__dirname,'../db/student.json'),JSON.stringify(student));

    res.redirect('/student')
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
    homepage,
    phoneVerifyDone
}