import express from 'express';
import { paymentordercreationController, paymentverification  } from '../controllers/paymentController.js';

const router = express.Router();


//ORDER CREATION || METHOD POST
router.post('/ordercreation',paymentordercreationController)


//PAYMENT VERIFICATION || METHOD POST
router.post('/paymentverification/:id',paymentverification)

//PAYMENT KEY || METHOD GET
router.get('/r_key',(req,res) => res.status(200).send(
    {
       key: process.env.razorpay_api  
    }
    ))

export default router;