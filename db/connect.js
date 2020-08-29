const express = require('express');
const mongoose = require('mongoose');

// ENV variable
// const URI = require('../config/db_key');

//Local URI
const URI = 'mongodb://localhost/Reset';

//DB connection
 const connection = mongoose.connect( `${URI}` ,
 { useNewUrlParser: true, useUnifiedTopology: true } )
 .then(db =>
  console.log('Database connected '))
 .catch(err => console.log(err));

 module.exports = connection ;