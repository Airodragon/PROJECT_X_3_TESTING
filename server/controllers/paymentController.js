import { instance } from "../server.js"
import crypto from 'crypto'
import userModel from "../models/userModel.js"


// ORDER CREATION

export const paymentordercreationController = async (req, res) => {
    let user_id = req.body.user_id
    var options = {
        'amount': 100,
        'currency': 'INR',
        'receipt': `receipt?${user_id.slice(0, 5)}?${user_id.slice(10, 15)}`,
    }
    console.log(`ORDER CREATION STARTED`.bgYellow.black)
    try {
        instance.orders.create(options, function (err, order) {
            if (err) {
                console.log(`SOMETHING WENT WRONG ${err}`.bgRed.black)
                return res.status(200).json({
                    message: "Something went wrong",
                    error: err
                })
            }
            console.log(`ORDER CREATED ${order}`.bgGreen.black)
            return res.status(200).json({
                message: "Order created",
                order
            })
        })
    } catch (error) {
        console.log(`SOMETHING WENT WRONG ${error}`.bgRed.black)
        return res.status(404).json({
            message: "Something went wrong"
        })
    }
}


// ORDER VERIFICATION
export const paymentverification = async (req, res) => {
    let id = req.params.id
    console.log(`ID RECEIVED ${id}`.bgYellow.black)
    console.log(`PAYMENT VERIFICATION STARTED`.bgYellow.black)
    // console.log(`${req.body.razorpay_order_id}`.bgRed.black)
    const razorpay_order_id = req.body.razorpay_order_id
    const razorpay_payment_id = req.body.razorpay_payment_id
    const razorpay_signature = req.body.razorpay_signature

    const body = razorpay_order_id + "|" + razorpay_payment_id


    var expectedSignature = crypto.createHmac("sha256", process.env.razorpay_key).
        update(body.toString()).
        digest('hex')
    // console.log("sig received" + razorpay_signature)
    // console.log("sig generated" + expectedSignature)

    const isAuthentic = expectedSignature === razorpay_signature
    if (isAuthentic) {
        console.log(`PAYMENT VERIFIED`.bgGreen.black)
        let user = await userModel.findOne({ id })
        // console.log(`USER FOUND ${user}`.bgGreen.black)
        // console.log(`USER FOUND ${user.id}`.bgGreen.black)
        let user_session = user.sessionsLeft
        try {
            let userupdate = await userModel.findOneAndUpdate({ id }, { sessionsLeft: user_session + 10}, { new: true })
            userupdate = await userModel.findOneAndUpdate({ id }, {
                $push: {
                    payment: {
                        id: razorpay_order_id,
                        order_id: razorpay_payment_id,
                        status: "success",
                        date : Date.now(),
                        amount: 10
                    }
                }
            }, { new: true })  
            console.log(`USER UPDATED ${userupdate}`.bgGreen.black)
            console.log(`PAYMENT DETAILS SAVED TO DATABASE`.bgGreen.black)
        } catch (error) {
            console.log(`SOMETHING WENT WRONG ${error}`.bgRed.black)
            return res.status(404).json({
                message: "Something went wrong"
            })
        }
        return res.status(200).redirect(`http://localhost:${process.env.FRONTEND_PORT}`)
    }
    else {
        console.log(`PAYMENT NOT VERIFIED`.bgRed.black)
        return res.status(200).json({
            success: false,
            message: "Unauthorized"
        })
    }

}