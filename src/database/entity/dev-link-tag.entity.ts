import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DevLink } from './dev-link.entity';

@Entity({ database: 'postlude', name: 'dev_link_tag' })
export class DevLinkTag {
	@PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
	id: number;

	@Column({ type: 'int', name: 'dev_link_id', unsigned: true })
	devLinkId: number;

	@Column({ type: 'int', name: 'tag', unsigned: true })
	tag: string;

	@Column({ type: 'datetime', name: 'created_at' })
	createdAt: Date;

	@ManyToOne(() => DevLink, (devLink) => devLink.devLinkTags, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'dev_link_id' })
	devLink: DevLink;
}