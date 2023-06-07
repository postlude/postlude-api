import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Tag } from './tag.entity';

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

	@ManyToMany(() => Tag)
	@JoinTable({
		name: 'dev_link_tag',
		joinColumn: {
			name: 'dev_link_id',
			referencedColumnName: 'id'
		},
		inverseJoinColumn: {
			name: 'tag_id',
			referencedColumnName: 'id'
		}
	})
	tags: Tag[];
}