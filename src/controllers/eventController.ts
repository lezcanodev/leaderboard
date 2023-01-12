import { Request, Response } from 'express';
import pgSource from '../datasource/';
import { Event } from '../entities/';

const eventController = async (req: Request, res: Response) => {
	const {  eventId, eventName } = req.params;

	const event = await pgSource.getRepository(Event)
				   .createQueryBuilder('event')
				   .leftJoinAndSelect('event.competitions', 'competition')
				   .leftJoinAndSelect('event.theme', 'theme')
				   .leftJoinAndSelect('competition.competitor', 'competitor')
				   .where('event.id = :eventId', { eventId })
				   .limit(5)
				   .getOne();
	

	res.render('event',{ event });
}

export { eventController };