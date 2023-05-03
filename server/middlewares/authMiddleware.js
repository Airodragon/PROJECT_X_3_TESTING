import JWT from 'jsonwebtoken';
import userModel from '../models/userModel.js';

export const requireSignIn = async (req, res, next) => {
    try{
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET)
        req.user = decode;
        next()
    } catch(error){
        console.log(error+" in registerController".bgRed.white);
        res.status(500).send({
            success: false,
            message: "Error in Registration",
            error: error.message
        })
    }
}
