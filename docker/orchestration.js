import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import cors from 'cors';

import orchesroute from './routes/orchesroute.js';
import connectorchDB from './config/db.js';


dotenv.config();

connectorchDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get('/', (req, res) => {
    res.send('Server Started');
});

app.use('/api/docserve', orchesroute);

const PORT = process.env.BACKEND_PORT || 9000;

app.listen(PORT, () => {
    console.log(`Orchestration is running on ${PORT}`.bgYellow.black);
});