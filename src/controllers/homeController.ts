import { Request, Response } from 'express';
import { Competition  } from '../entities/';


const homeController = async (req: Request, res: Response) => {
	const competitions = await Competition.getInfo();
	res.render('index', { competitions });
}

export { homeController };