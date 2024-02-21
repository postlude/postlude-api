import { Entity, PrimaryColumn } from 'typeorm';

@Entity({ database: 'postlude', name: 'dev_link_tag' })
export class DevLinkTag {
	@PrimaryColumn({ type: 'int', name: 'dev_link_id', unsigned: true })
	devLinkId: number;

	@PrimaryColumn({ type: 'int', name: 'tag_id', unsigned: true })
	tagId: number;
}