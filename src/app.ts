import * as dotenv from 'dotenv';
dotenv.config();

import * as express from 'express';
import * as path from 'path';
import pgSource from './datasource';
import  routes  from './routes';
import { Request, Response, Application, NextFunction } from 'express';

const app: Application = express();

//Set template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, '..', 'public')));


app.use((req: Request,res: Response, next: NextFunction) => {
	res.locals.baseUrl = process.env.BASE_URL;

	res.locals.getUrlCountryIcon = function(codeCountry: string, size: number =16): string {
		return `https://www.countryflagicons.com/FLAT/${size}/${codeCountry}.png`;
	}

	res.locals.eventRoute = function(eventId: number, eventName: string): string {
		return `${process.env.BASE_URL}event/${eventId}/${eventName}`;
	}

	res.locals.competitorRoute = function(competitorId: number, competitorName: string): string {
		return `${process.env.BASE_URL}competitor/${competitorId}/${competitorName}`;
	}

	res.locals.css = function(path: string): string {
		return `${process.env.BASE_URL}css/${path}`;
	}

	next();
});

//Routes
app.use(routes);

const start = async function(): Promise<void> {
	try{
		await pgSource.initialize();
		app.listen(process.env.APP_PORT);
	}catch(err){
		console.log(err);
	}
}
start();