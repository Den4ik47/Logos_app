const express = require('express');
const validator = require('validator');
const mysql=require('mysql');
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');
var session=require('express-session');
const router = new express.Router();
var connection = mysql.createConnection({
  host     : '217.173.195.9',
  user     : '119844',
  password : '119844',
  database:'119844'
});

connection.connect(function(err){
  if(!err) {
      console.log("Database is connected ... nn");
} else {
    console.log("Error connecting database ... nn");
}

});  
//var db = require("./config.js");
/**
 * Validate the sign up form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function validateSignupForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
    isFormValid = false;
    errors.email = 'Please provide a correct email address.';
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 8) {
    isFormValid = false;
    errors.password = 'Password must have at least 8 characters.';
  }

  if (!payload || typeof payload.name !== 'string' || payload.name.trim().length === 0) {
    isFormValid = false;
    errors.name = 'Please provide your name.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}

/**
 * Validate the login form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function validateLoginForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0) {
    isFormValid = false;
    errors.email = 'Please provide your email address.';
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
    isFormValid = false;
    errors.password = 'Please provide your password.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}

router.post('/signup', (req, res) => {
  const validationResult = validateSignupForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }


        connection.query("SELECT * FROM users WHERE email = ?",[req.body.email], function(err, rows) {
          if (err) {
           //command/query
            console.log("ERROR");
            console.log(err);
              }
          if (rows.length) {
            return res.status(400).json({
              success: false,
              message: 'Oops! Email already exist.',
          });
          }
          
          else {
            connection.query("SELECT * FROM users WHERE username = ?",[req.body.name], function(err, rows) {
              if (err) {
               //command/query
                console.log("ERROR");
                console.log(err);
                  }
              if (rows.length) {
                return res.status(400).json({
                  success: false,
                  message: 'Oops! Username already exist.',
              });
              }else{
              // if there is no user with that username
              // create the user           
              const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const passwordHash = bcrypt.hashSync(req.body.password, salt);
var today = new Date();
              var newUserMysql = {
                  username: req.body.name,
                  email: req.body.email,
                  password: passwordHash,
                  created:today,
                  modified:today  // use the generateHash function in our user model
              };
    
              var insertQuery = "INSERT INTO users ( username, email, password, created, modified ) values (?,?,?,?,?)";
    
              connection.query(insertQuery,[newUserMysql.username,newUserMysql.email, newUserMysql.password,newUserMysql.created,newUserMysql.modified],function(err, rows) {
              
                  return res.status(200).json({
                    success: true,
                    message: 'You have successfully signed up! Now you should be able to log in.'
                
                });}
              );}
              });}});

  // return passport.authenticate('local-signup', (err) => {
   
});

  router.post('/login', (req, res) => {
    const validationResult = validateLoginForm(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
      });
    }
  
  
    connection.query("SELECT * FROM users WHERE email = ?",[req.body.email], function(err, rows){
      if (err)
          return err;
      if (!rows.length) {
        
          return res.status(400).json({
            success: false,
            message: 'Oops! Wrong email.',
        });
          
      }
      console.log(rows[0]);
      // if the user is found but the password is wrong
      if (!bcrypt.compareSync(req.body.password, rows[0].password)){
      return res.status(400).json({
        success: false,
        message: 'Oops! Wrong password.',
    }); // create the loginMessage and save it to session as flashdata
      }
req.session.username=rows[0].username;
      // all is well, return successful user
      return res.json({
        success: true,
        message: 'You have successfully logged in!',
        token:req.session.username
      });
      
  });      

    });
    
module.exports = router;