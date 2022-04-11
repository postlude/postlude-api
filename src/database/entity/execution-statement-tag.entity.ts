import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ database: 'postlude', name: 'execution_statement_tag' })
export class DevLinkTag {
	@PrimaryGeneratedColumn({ type: 'int', name: 'idx', unsigned: true })
	idx: number;

	@Column({ type: 'int', name: 'execution_statement_idx', unsigned: true })
	executionStatementIdx: number;

	@Column({ type: 'int', name: 'tag_idx', unsigned: true })
	tagIdx: number;

	@Column({ type: 'datetime', name: 'created_at' })
	createdAt: Date;
}