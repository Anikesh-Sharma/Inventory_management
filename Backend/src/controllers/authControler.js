const User = require('../Models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
    const { name, email, password } = req.body;
    console.log(name);
    try{
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(401).json({message: 'The user already exist'})
        }
        const hashPassword = await bcrypt.hash(password,5)
        const newUser =await  User.create({
            name,
            email,
            password: hashPassword,
        })
        console.log(newUser)
        // await newUser.save();
        res.status(201).json({message: 'New user successfully created'})
    }
    catch(error){
        console.log('Error', error);
        res.status(500).json({message: 'Internal message Error'})        
    }
}


const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({message: `user doesn't exist`})
        }
        const isMatched = await bcrypt.compare(password, user.password);

        if(!isMatched){
            return res.status(403).json({message: 'The password is invalid'})
        }

        const token = jwt.sign(
            {userId: user._id},
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        )
        res.status(200).json({token})
    } catch (error) {
        console.log('Error', error);
        res.status(500).json({message: 'Internal message Error'})
    }
}

module.exports = {register, login}