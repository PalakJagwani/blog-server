import {ApiResponse} from '../utils/ApiResponse.js'
import jwt from 'jsonwebtoken'

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(token == null){
        return res.status(400).json(
            new ApiResponse(400, {}, "Token is missing")
        )
    }

    jwt.verify(token, process.env.ACCESS_SECRET_KEY, (error, user) => {
        if(error){
            return res.status(400).json(
                new ApiResponse(400, {}, "Invalid Token")
            )
        }

        req.user = user
        next()
    })
}