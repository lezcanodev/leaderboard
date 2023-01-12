import * as express from 'express';
import { eventController } from '../controllers/eventController';

const router = express.Router();

router.get('/:eventId/:eventName', eventController);

export default router;
