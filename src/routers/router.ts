import express, { Router } from 'express';
import { createWallet,getWallet } from '../controllers/wallet';

const router: Router = express.Router();

router.post('/wallet', createWallet);
router.get('/wallet', getWallet);

export default router;
