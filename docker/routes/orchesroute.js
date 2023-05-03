import express from 'express';
import colors from 'colors';
import { createimageController } from '../controllers/orchecontrol.js';

const router = express.Router();

// router.get('/', (req, res) => {
//     res.send('Orchestration is running');
// });

router.post('/',createimageController);


export default router;