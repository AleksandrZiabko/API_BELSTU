import express from 'express';
import regController from '../controllers/registration';
import authController from '../controllers/authentification';

const router = express.Router();

router.post('/reg', regController.reg);
router.post('/auth', authController.auth);

export default router;