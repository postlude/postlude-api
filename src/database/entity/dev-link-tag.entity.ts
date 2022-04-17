import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ database: 'postlude', name: 'dev_link_tag' })
export class DevLinkTag {
	@PrimaryGeneratedColumn({ type: 'int', name: 'idx', unsigned: true })
	idx: number;

	@Column({ type: 'int', name: 'dev_link_idx', unsigned: true })
	devLinkIdx: number;

	@Column({ type: 'int', name: 'tag_idx', unsigned: true })
	tagIdx: number;
}