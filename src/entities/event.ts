import { Competition, Theme } from './';
import {Entity, 
	Column, 
	JoinColumn,
	PrimaryGeneratedColumn, 
	OneToMany, 
	ManyToOne  } from 'typeorm';

@Entity('event')
export class Event{
	@PrimaryGeneratedColumn()
	id: number
	
	@Column({ 
		name: 'name',
		length: 150,
		nullable: false
	})
	name: string

	@Column({ 
		name: 'started_at',
		type: 'timestamp',
		nullable: false
	})
	startedAt: Date

	@Column({ 
		name: 'finished_at',
		type: 'timestamp',
		nullable: false
	})
	finishedAt: Date

	@OneToMany(() => Competition, (cp) => cp.event)
	competitions: Competition[]
	
	@ManyToOne(() => Theme)
	@JoinColumn({
		name: 'theme_id'
	})
	theme: Theme

	get startedAtDate(): string{
		return (new Date(this.startedAt)).toLocaleString();
	}

	get finishedAtDate(): string{
		return (new Date(this.finishedAt)).toLocaleString();
	}

	get duration(): string{
		const startedAt: number = (new Date(this.startedAt)).getTime();
		const finishedAt: number = (new Date(this.finishedAt)).getTime();
		return (finishedAt - startedAt)/(1000*60*60) + ' hours';
	}

}