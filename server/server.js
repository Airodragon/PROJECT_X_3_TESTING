import express  from 'express';
import colors  from 'colors';
import dotenv  from 'dotenv';
import morgan from 'morgan';
import cors from 'cors'
import Razorpay from 'razorpay';



import connectDB from './config/db.js';
import authRoute from './routes/authRoute.js';
import paymentRoute from './routes/paymentRoute.js';



// Configure env
dotenv.config();

//connect to db
connectDB();

// config razorpay

export const instance = new Razorpay({
    key_id: process.env.razorpay_api,
    key_secret: process.env.razorpay_key,
  });


//rest object
const app = express();


//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));


//routes
app.use('/api/auth', authRoute);
app.use('/api/payment', paymentRoute);


//rest api
app.get('/', (req, res) => {
    res.send('Server Started');
});


//PORT

const PORT = process.env.BACKEND_PORT || 5000;
//run listen
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`.bgYellow.black);
});