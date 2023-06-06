import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ database: 'postlude', name: 'tag' })
export class Tag {
	@PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
	id: number;

	@Column({ type: 'varchar', name: 'tag', unique: true })
	tag: string;

	@Column({ type: 'datetime', name: 'created_at' })
	createdAt: Date;
}