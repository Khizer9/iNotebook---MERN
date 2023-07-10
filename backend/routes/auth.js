const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'khizerisagoodb@y'

//ROUTE 1: Create a User using: POST "/api/auth/creatuser". No login required
router.post('/creatuser', [
    body('name', "Enter a valid Name").isLength({ min: 3 }),
    body('email', "Enter a valid Email").isEmail(),
    body('password', "Enter a valid Password").isLength({ min: 5 }),
], async (req, res) => {

    // If there are error return bad request and errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    // check wheather the user with this email already exists
    try{
    let user = await User.findOne({email: req.body.email})
    if(user){
        return res.status(400).json({ error: "Sorry a user with this email already exists"})
    }
    // Create a new user
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    user = await User.create({ 
        name: req.body.name,
        email: req.body.email,
        password: secPass,
    })
    const data = {
        user: {
            id: user.id,
        }
    }
    const authToken = jwt.sign(data, JWT_SECRET)
    res.json({authToken})

} catch (err) {
    console.error(err.message)
    res.status(500).send("Internal Server Error")
}
})

//ROUTE 2: Create a User using: POST "/api/auth/login". No login required
router.post('/login', [
    body('email', "Enter a valid Email").isEmail(),
    body('password', "Please Enter a password").exists(),
],async (req, res) => {
    let success = false;
    // If there are error return bad request and errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} =  req.body
    try {
        let user = await User.findOne({ email})
        if(!user){
            success = false
            return res.status(400).json({success, error: "Please try to login with correct credentials"})
        }

        const passwordCompare = await bcrypt.compare(password, user.password)
        if(!passwordCompare){
            success = false
            return res.status(400).json({success, error: "Please try to login with correct credentials"})
            
        }
        const data = {
            user: {
                id: user.id,
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        success = true
        res.json({success, authToken})

    } catch (err) {
        console.error(err.message)
        res.status(500).send("Internal Server Error")
    }

})    

// ROUTE 3: Get Loggedin User Details using: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser,  async (req, res) => {
try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user);
} catch (err) {
    console.error(err.message)
    res.status(500).send("Internal Server Error")
}

})
module.exports = router;