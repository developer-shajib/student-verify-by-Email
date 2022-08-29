const express = require('express');
const path = require('path');
const colors = require('colors');
const dotenv = require('dotenv');
const pageRoute = require('./routes/pageRoute');
const expressLayouts = require('express-ejs-layouts');

//environment variable
dotenv.config();
const port = process.env.PORT || 4000;

//init express
const app = express();

//init form data
app.use(express.json());
app.use(express.urlencoded( { extended : false } ));

//ejs init
app.set('view engine', 'ejs');
// app.set('views', 'temp');   ////(jodi views folder bade onno kono folder theke telplete load korte cai taile aibabe oi folder er nam dite hove)
app.use(expressLayouts);
app.set('layout', 'layouts/app')

//static folder
app.use(express.static('./public'));

//router init
app.use(pageRoute);

//create server 
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
