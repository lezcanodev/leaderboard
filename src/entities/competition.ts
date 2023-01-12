import { Entity, Column,PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import pgSource from '../datasource';
import {Event, Competitor} from './';

@Entity('competition')
export class Competition{

	@PrimaryColumn({ 
		name: 'event_id',
		select: false
	})
	eventId: number;

	@PrimaryColumn({ 
		name: 'competitor_id'
	})
	competitorId: number;

	@Column({
		type: 'numeric',
		name: 'score'
	})
	score: number;	

	@ManyToOne(() => Event, (ev) => ev.competitions)
	@JoinColumn({ name: 'event_id' })
	event: Event;

	@ManyToOne(() => Competitor, (cp) => cp.competitions)
	@JoinColumn({ name: 'competitor_id' })
	competitor: Competitor;

	static async getInfo() {
		const ranking = await pgSource.manager
					.getRepository(this)
					.createQueryBuilder("competition")
					.select('*')
					.addSelect('DENSE_RANK() OVER(PARTITION BY event_id ORDER BY score 					           	    DESC)','pos');
	
		const competitions = await pgSource.manager
						.createQueryBuilder()
						.select(['ev.id','ev.name','ev.started_at','ev.finished_at'])
						.addSelect(`array_agg('{' ||
							'"'||'id'||'"'     ||':'||'"'||cp.id ||'"'|| ','
							'"'||'country'||'"'||':'||'"'||cp.country ||'"'|| ','
							'"'||'name'||'"'  ||':'||'"'||cp.first_name || ' ' || 							cp.last_name||'"'
						|| '}')`,
 						'winners')
						.addSelect('ranking.score', 'score')
						.from(`(${ ranking.getSql() })`, 'ranking')
						.innerJoin(Event, 'ev', 'ranking.event_id = ev.id')
						.innerJoin(Competitor, 'cp', 'ranking.competitor_id = cp.id')
						.where('ranking.pos = :pos', { pos: '1' })
						.groupBy('ev.name')
						.addGroupBy('ev.id')
						.addGroupBy('ev.started_at')
						.addGroupBy('ev.finished_at')
						.addGroupBy('ranking.score')
						.getRawMany();
					
		return competitions;
	}

}