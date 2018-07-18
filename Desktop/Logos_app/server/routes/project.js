const express = require('express');
var session=require('express-session');
const router = new express.Router();
router.post('/add', (req, res) => {
    const project_name = validateSignupForm(req.body.project_name);
    console.log(project_name);
});
    
module.exports = router;