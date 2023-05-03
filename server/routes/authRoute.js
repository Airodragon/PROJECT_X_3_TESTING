import express from 'express';
import {registerController, loginController, testController, passwordresetController, 
    verifyuserpasswordresetController, passwordresetControllerafterverify,getusersessionleftController, getuserinfoController, sessionleftController} from '../controllers/authController.js';
import { requireSignIn } from '../middlewares/authMiddleware.js';

const router = express.Router();

//REGISTER || METHOD POST
router.post('/register', registerController);

//LOGIN || METHOD POST
router.post('/login', loginController);


//TEST || METHOD GET
router.get('/test', requireSignIn, testController);

//protected route
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ok: true})
})

//password reset
router.post('/password-reset',passwordresetController);

//verify user for password reset
router.get('/forgotpassword/:id/:token', verifyuserpasswordresetController);


//change password
router.post('/:id/:token', passwordresetControllerafterverify);


//get sessions
router.get('/usersessionleft/:id',  getusersessionleftController);

//get session deduction
router.get('/sessiondeduction/:id',  sessionleftController);

//get user information
router.get('/user/:id',  getuserinfoController);

export default router;