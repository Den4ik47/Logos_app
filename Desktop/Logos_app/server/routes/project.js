const express = require('express');
var session=require('express-session');
const router = new express.Router();
var db = require('../config/database.js');
var bcrypt = require('bcrypt');
/**
 * Validate the sign up form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function validate(payload) {
    const errors = {};
    let isFormValid = true;
  if(payload===payload.project_name){
    if (!payload || typeof payload.project_name !== 'string' || payload.project_name.length === 0) {
      isFormValid = false;
      errors.name = 'Please provide your name.';
    }}
    else{
  if(!payload || typeof payload.checked_project !== 'string' || payload.checked_project.length === 0){
    isFormValid = false;
      errors.name = 'Please check project, before you will start.';
  }}
    return {
      success: isFormValid,
      errors
    };
  }
  router.post('/start',(req,res)=>{
    const validationResult = validate(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        errors: validationResult.errors
      });
    }
    else{
      return res.end();
    
    }
  });
router.post('/add', (req, res) => {
    const validationResult = validate(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        errors: validationResult.errors
      });
    }
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const ProjectHash = bcrypt.hashSync(req.body.project_name, salt);
    var today = new Date();
              var newUserMysql = {
                  project_name: req.body.project_name,
                  u_id: ProjectHash,
                  user_id:req.body.username,
                  created:today  // use the generateHash function in our user model
              };
    console.log(req.body.username);
              var insertQuery = "INSERT INTO Projects_data ( project_name, id_user , id_project , created ) values (?,?,?,?)";
    
              db.query(insertQuery,[newUserMysql.project_name,newUserMysql.user_id,newUserMysql.u_id,newUserMysql.created],function(err, rows) {
              
                  return res.status(200).json({
                    success: true
                });});
});
router.get('/print', (req, res) => {
	db.query('SELECT project_name from Projects_data', function(err, rows, fields) {
		if (!err) {
        	res.send(JSON.stringify(rows));
		} else {
			console.log('Error while performing Query.');
		}
	});
});

module.exports = router;