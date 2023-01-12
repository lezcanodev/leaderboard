import * as express from 'express';
import homeRouter from './home';
import eventRouter from './event';
import competitorRouter from './competitor';
import { Request, Response } from 'express';

const router = express.Router();

router.use(homeRouter);
router.use('/event', eventRouter);
router.use('/competitor', competitorRouter);


router.use((req: Request,res: Response) => {
	res.render('404');
});


export default router;
