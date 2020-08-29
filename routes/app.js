const express = require('express');
const async = require('async');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');
const mongoose = require('mongoose');
const router = express.Router();

// ENV variable
// const auth = require('../config/mail_key');


const User = require('../model/reset');
//Routes => ('/user/route)
router.post('/data', (req,res)=>{
    const user = new User({
        email: req.body.email
    })
    user.save()
    .then(user => console.log(user))
    .catch(err => { throw err });
});

//Forgot password(GET)
router.get('/lost_pwd', (req,res)=>{
   res.status(200).json('React forgotPwd Form');
});
//Post request 
router.post('/lost_pwd',(req,res,next)=>{
    //(Set Token)
    async.waterfall([ done =>{
        crypto.randomBytes(32, (err, buffer)=> {
        const token = buffer.toString('hex');
        done(err, token);
        // res.status(200).json({ Token: token});
      });
    },
    //Check for Email
    (token, done)=>{
        //Database Scour
         User.findOne({ email: req.body.email})
         .then(user =>{
            if(!user){
               return res.status(422).json({error: 'User not Found!!!'});
             }
            //Generate Token
           user.resetPasswordToken = token;
            //Token Expiry
           const expiry = user.resetPasswordExpires = Date.now() + 360000; // (1hr)
            //Save Token data
           user.save(err => {
           done(err, token, user);
         })
    },
    (token, user, done)=> {
      const auth = {
         auth: {
          api_key: '65f4da4ca37bc0dacaa19efff0b26f21-ee13fadb-c59c28dc',
          domain: 'sandbox609aff8b698e4825b7035bf89d8c44ec.mailgun.org'
        }
      }
      const transporter = nodemailer.createTransport(mailGun(auth));
      //Mail Options
      const mailOptions = {
        to: user.email,
        from: 'wenovate@backend',
        subject: 'Password Reset',
        text: 'You have requested to reset your account password.\n\n' +
          'Click on the link, or paste this into a browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/reset/' + token + '\n\n' +
          'If you did not request this, ignore this mail and keep your password unchanged.\n'
      };

      transporter.sendMail(mailOptions,(err)=> {
        //feedBack(Flash Global info)
        // req.flash('info', 'A mail has been sent to ' + user.email + ' with further instructions.');
        res.json('A mail has been sent to ' + user.email + ' with further instructions.');
        done(err, 'done');
      });
         })}
    ]),(err)=> {
         if (err) return next(err);
         res.redirect('/user/lost_pwd');
  };
});

//SECOND PHASE
//Reset link Implementation
router.get('/reset/:token', (req, res) => {
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, (err, user) => {
    if(!user) {
    //   req.flash('error', 'Password reset token is invalid or has expired.');
    res.status(422).json({Error: 'Password reset token is invalid or has expired.' });
      return res.redirect('/user/lost_pwd');
    }
    res.status(200).json({msg: 'React page with new password form' });
  });
});


router.post('/reset/:token', (req, res)=> {
  async.waterfall([
    (done)=> {
      User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, (err, user)=> {
        if(!user) {
          // req.flash('error', 'Password reset token is invalid or has expired.');
          res.status(422).json({Error: 'Password reset token is invalid or has expired.' });
          return res.redirect('/user/lost_pwd');
        }
         //New Password
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
          //Password save and Login Request
        user.save( err => {
          req.logIn(user, (err)=> {
            done(err, user);
          });
        });
      });
    },
    (user, done)=> {
      const auth = {
         auth: {
          api_key: '65f4da4ca37bc0dacaa19efff0b26f21-ee13fadb-c59c28dc',
          domain: 'sandbox609aff8b698e4825b7035bf89d8c44ec.mailgun.org'
        }
      }
      const transporter = nodemailer.createTransport(mailGun(auth));
      //Send Options
      const mailOptions = {
        to: user.email,
        from: 'wenovate@backend',
        subject: 'Your password has been changed',
        text: 'Hey there,\n\n' +
          'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
      };
      transporter.sendMail(mailOptions, err => {
        // req.flash('success', 'Success! Your password has been changed.');
        res.status(422).json({Success: 'Password have been changed!!' });
        done(err);
      });
    }
  ], (err) => {
    res.redirect('/user/lost_pwd');
  });
});
module.exports = router;