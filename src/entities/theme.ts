import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


@Entity('theme')
export class Theme{
	@PrimaryGeneratedColumn()
	id: number
	
	@Column({ 
		name: 'name',
		length: 100,
		nullable: false
	})
	name: string

}