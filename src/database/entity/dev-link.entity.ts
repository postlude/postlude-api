import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DevLinkTag } from './dev-link-tag.entity';

@Entity({ database: 'postlude', name: 'dev_link' })
export class DevLink {
	@PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
	id: number;

	@Column({ type: 'varchar', name: 'title' })
	title: string;

	@Column({ type: 'varchar', name: 'url' })
	url: string;

	@Column({ type: 'datetime', name: 'created_at' })
	createdAt: Date;

	@Column({ type: 'datetime', name: 'updated_at' })
	updatedAt: Date;

	@OneToMany(() => DevLinkTag, (devLinkTag) => devLinkTag.devLink)
	devLinkTags: DevLinkTag[];
}