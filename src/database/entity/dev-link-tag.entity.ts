import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ database: 'postlude', name: 'dev_link_tag' })
export class DevLinkTag {
	@PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
	id: number;

	@Column({ type: 'int', name: 'dev_link_id', unsigned: true })
	devLinkId: number;

	@Column({ type: 'int', name: 'tag_id', unsigned: true })
	tagId: number;
}