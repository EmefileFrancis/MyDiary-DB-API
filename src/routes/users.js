import express from 'express';
import { insertANewUser } from '../queries';

const router = express.Router();

router.post('/', insertANewUser);

export default router;
