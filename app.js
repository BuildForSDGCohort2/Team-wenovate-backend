const express = require('express');
const dotenv = require("dotenv");
//Express App
const app = express();
dotenv.config();
//Route imp decl.
const main = require('./routes/app');
//DB import
const connection = require('./db/connect');
app.use(express.urlencoded({ extended: true }));
//Route use
app.use('/user', main);

//PORT
const port = process.env.PORT || 3000 ;

//Server Connection
app.listen(port, (err =>{
    if(!err){
        console.log(`Server connected to port ${port}`);
    }else{
        throw new Error ;
    }
}))
