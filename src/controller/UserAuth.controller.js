import User from '../models/user.js'
import bcrypt from 'bcrypt'
import {ApiResponse} from '../utils/ApiResponse.js'
import jwt from 'jsonwebtoken'
import Token from '../models/token.js'

export const signUpUser = async (req, res) => {
    try {
        const existedUser = await User.findOne({email : req.body.email});

        if(existedUser){
            return res.status(400).json({message : "Username already exists!"})
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = {email : req.body.email,  password : hashedPassword}
        const newUser = await new User(user)
        await newUser.save();
        return res.status(200).json(
            new ApiResponse(200, {currentuser : user.email}, "User signed up successfully")
        )
    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500, {}, "Error in signing up the user")
        )
    }
}

export const loginUser = async (req, res) => {
    let user = await User.findOne( {email : req.body.email} )
    if(!user){
        return res.status(400).json(new ApiResponse(500, {}, "Wrong username"))
    }
    try {
        let match = await bcrypt.compare(req.body.password, user.password)
        if(match){
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, {expiresIn : '30m'});
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);
            const newToken = new Token({token : refreshToken})
            await newToken.save()

            return res.status(200).json(new ApiResponse(200, {accessToken : accessToken, refreshToken : refreshToken , email : user.email}, "User logged in successfully"))
        }else{
            return res.status(400).json(new ApiResponse(400, {}, "Incorrect Password"))
        }
    } catch (error) {
        return res.status(500).json(500, {}, "Error in logging in the user")
    }
}