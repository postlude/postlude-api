import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Tag } from './tag.entity';

@Entity({ database: 'postlude', name: 'execution_statement' })
export class DevLink {
	@PrimaryGeneratedColumn({ type: 'int', name: 'idx', unsigned: true })
	idx: number;

	@Column({ type: 'varchar', name: 'title' })
	title: string;

	@Column({ type: 'varchar', name: 'statement' })
	statement: string;

	@Column({ type: 'varchar', name: 'description' })
	description: string;

	@Column({ type: 'datetime', name: 'created_at' })
	createdAt: Date;

	@Column({ type: 'datetime', name: 'updated_at' })
	updatedAt: Date;

	@ManyToMany(() => Tag)
	@JoinTable({
		name: 'execution_statement_tag',
		joinColumn: {
			name: 'execution_statement_idx',
			referencedColumnName: 'idx'
		},
		inverseJoinColumn: {
			name: 'tag_idx',
			referencedColumnName: 'idx'
		}
	})
	tagList: Tag[];
}