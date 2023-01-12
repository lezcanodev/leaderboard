import * as express from 'express';
import { competitorController } from '../controllers/competitorController';

const router = express.Router();

router.get('/:competitorId/:competitorName', competitorController);

export default router;
