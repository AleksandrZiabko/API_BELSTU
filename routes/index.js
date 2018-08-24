import express from 'express';
import regController from '../controllers/registration';
import authController from '../controllers/authentification';
import saveController from '../controllers/saveProjects';
import fs from 'fs';

const router = express.Router();

router.post('/reg', regController.reg);
router.post('/auth', authController.auth);
router.post('/upload', saveController.saveProject.bind(saveController));

export default router;
