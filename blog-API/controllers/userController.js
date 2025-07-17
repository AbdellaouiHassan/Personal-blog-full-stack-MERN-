const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();

const User = require("../models/user");
const { protect } = require('../middlewares/authMiddleware')

// registring user
router.post('/register', async(req, res) =>{
    const {name, email, password} = req.body;

// Check if any field is passe empty
    if(!name || !email || !password){
        res.status(400);
        throw new Error("All fields are required")
    }
// Chech if user already exists
    const userExists = await User.findOne({email});

    if (userExists){
        res.status(400).json('User already exists')
    };

// Hash the password   
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

// create user 
   try {
     const user = await User.create({
        name,
        email,
        password: hashedPassword
    });
    res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
    })
   } catch (error) {
    res.status(400).json(error);
   }   
})

//Login user
router.post('/login', async(req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({email});
        const matched = await bcrypt.compare(password, user.password);

        if (user && matched){
            res.status(200).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            })
        } else{
            res.status(400).json("Invalid credentilas")
        }
    } catch (error) {
        res.status(400).json(error);
    }
})

router.get('/me' , protect , async(req, res) => {
    try {
        const user = await User.findById(req.user.id)
        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
        })
    } catch (error) {
        console.log(error)
    }

})

//Generate jwt 
const generateToken = (id) => {
    console.log(process.env.JWT_SECRET)
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        {expiresIn: '30d'}
    )
}

module.exports = router;