import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { ExecutionStatement } from '../entity/execution-statement.entity';

@EntityRepository(ExecutionStatement)
export class ExecutionStatementRepository extends BaseRepository<ExecutionStatement> {
	/**
	 * @description 인덱스로 1건 조회
	 * @param executionStatementIdx
	 */
	public findOneByIdx(executionStatementIdx: number) {
		return this.createQueryBuilder('e')
			.select(['e.idx', 'e.title', 'e.statement', 'e.description', 't.tag'])
			.innerJoin('e.tagList', 't')
			.where('e.idx = :executionStatementIdx', { executionStatementIdx })
			.getOne();
	}
}