import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ database: 'postlude', name: 'dev_link_tag' })
export class DevLinkTag {
	@PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
	id: number;

	@Column({ type: 'int', name: 'dev_link_idx', unsigned: true })
	devLinkIdx: number;

	@Column({ type: 'int', name: 'tag_idx', unsigned: true })
	tagIdx: number;
}