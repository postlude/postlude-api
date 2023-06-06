import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ database: 'postlude', name: 'user' })
export class User {
	@PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
	id: number;

	@Column({ type: 'varchar', name: 'email' })
	email: string;

	@Column({ type: 'varchar', name: 'password' })
	password: string;

	@Column({ type: 'datetime', name: 'created_at' })
	createdAt: Date;

	@Column({ type: 'datetime', name: 'updated_at' })
	updatedAt: Date;
}