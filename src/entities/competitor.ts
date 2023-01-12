import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Competition } from './';

@Entity('competitor')
export class Competitor{
	@PrimaryGeneratedColumn()
	id: number
	
	@Column({ 
		name: 'first_name',
		length: 50,
		nullable: false
	})
	firstName: string

	@Column({ 
		name: 'last_name',
		length: 50,
		nullable: false
	})
	lastName: string

	@Column({ 
		name: 'country',
		length: 2,
		nullable: false
	})
	country: string

	@OneToMany(() => Competition, (cp) => cp.competitor)
	competitions: Competition[]


	get fullName(): string{
		return `${this.firstName} ${this.lastName}`;
	}

}