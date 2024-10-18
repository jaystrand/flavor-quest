import express, { Request, Response, Router } from 'express';
import { getPlaceholder, postPlaceholder } from '../controllers/placeholder';

const router: Router = express.Router();

router.get('/placeholder', getPlaceholder);
router.post('/placeholder', postPlaceholder);

export default router;