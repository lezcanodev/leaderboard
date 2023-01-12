import { Request, Response } from 'express';
import pgSource from '../datasource/';
import { Competitor } from '../entities/';


const competitorController = async (req: Request, res: Response) => {
	const {  competitorId } = req.params;

	const competitor = await pgSource.getRepository(Competitor)
				   .createQueryBuilder('competitor')
				   .leftJoinAndSelect('competitor.competitions', 'competition')
				   .leftJoinAndSelect('competition.event', 'event')
				   .leftJoinAndSelect('event.theme', 'theme')
				   .where('competitor.id = :competitorId', { competitorId })
				   .getOne();
	
	console.log(competitor.competitions[0]);
	res.render('competitor', { competitor });
}

export { competitorController };