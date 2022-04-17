import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { ExecutionStatementTag } from '../entity/execution-statement-tag.entity';

@EntityRepository(ExecutionStatementTag)
export class ExecutionStatementTagRepository extends BaseRepository<ExecutionStatementTag> {}