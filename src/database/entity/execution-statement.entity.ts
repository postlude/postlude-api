import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Tag } from './tag.entity';

@Entity({ database: 'postlude', name: 'execution_statement' })
export class ExecutionStatement {
	@PrimaryGeneratedColumn({ type: 'int', name: 'idx', unsigned: true })
	id: number;

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
			name: 'execution_statement_id',
			referencedColumnName: 'id'
		},
		inverseJoinColumn: {
			name: 'tag_id',
			referencedColumnName: 'id'
		}
	})
	tagList: Tag[];
}