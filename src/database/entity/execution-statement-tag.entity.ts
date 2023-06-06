import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ database: 'postlude', name: 'execution_statement_tag' })
export class ExecutionStatementTag {
	@PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
	id: number;

	@Column({ type: 'int', name: 'execution_statement_id', unsigned: true })
	executionStatementId: number;

	@Column({ type: 'int', name: 'tag_id', unsigned: true })
	tagId: number;
}