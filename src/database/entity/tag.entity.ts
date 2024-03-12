import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DevLink } from './dev-link.entity';

@Entity({ database: 'postlude', name: 'tag' })
export class Tag {
	@PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
	id: number;

	@Column({ type: 'varchar', name: 'name', unique: true, comment: '태그 이름' })
	name: string;

	@Column({ type: 'datetime', name: 'created_at' })
	createdAt: Date;

	@ManyToMany(() => DevLink, (devLink) => devLink.tags)
	devLinks: DevLink[];
}