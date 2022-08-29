const { json } = require('express');
const {readFileSync} = require('fs');
const path = require('path');


//Home page controllers
const showHomePage = (req,res)=>{
    const slider = readFileSync(path.join(__dirname,'../db/slider.json'));
    res.render('index',{
        slider : JSON.parse(slider.toString())
    })
}
const showStaffPage = (req,res)=>{
    const staff = readFileSync(path.join(__dirname,'../db/staff.json'));
    res.render('staff',{
        staff : JSON.parse(staff.toString())
    })
}
const showMenuPage = (req,res)=>{
    res.render('menu')
}
const showLocationPage = (req,res)=>{
    res.render('location')
}
const showblogPage = (req,res)=>{
    const blogPost = JSON.parse(readFileSync(path.join(__dirname,'../db/blog.json')).toString()) ;
    res.render('archive',{ blogPost})
}
const showReservationPage = (req,res)=>{
    res.render('reservation')
}
const showNewsPage = (req,res)=>{
    res.render('news')
}
const showGalleryPage = (req,res)=>{
    res.render('gallery')
}
//show single page
const showSingleblogPage = (req,res)=>{

    const posts = JSON.parse( readFileSync(path.join(__dirname,'../db/blog.json')));
    const singlePost = posts.find( data => data.id == req.params.id );

    res.render('single',{
        element : singlePost
    })
}

//export
module.exports ={
    showHomePage,
    showStaffPage,
    showMenuPage,
    showLocationPage,
    showblogPage,
    showReservationPage,
    showNewsPage,
    showGalleryPage,
    showSingleblogPage
    
}