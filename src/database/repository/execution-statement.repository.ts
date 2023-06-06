import { EntityRepository, Like } from 'typeorm';
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
			.select(['e.id', 'e.title', 'e.statement', 'e.description', 't.tag'])
			.innerJoin('e.tagList', 't')
			.where('e.id = :executionStatementIdx', { executionStatementIdx })
			.getOne();
	}

	/**
	 * @description 태그 검색시 전체 카운트
	 * @param tagList
	 */
	public async countByTag(tagList: string[]) {
		return await this.createQueryBuilder('e')
			.select('e.id')
			.innerJoin('e.tagList', 't')
			.where('t.tag IN (:tagList)', { tagList })
			.groupBy('e.id')
			.having('COUNT(e.id) = :tagCnt', { tagCnt: tagList.length })
			.getMany();
	}

	/**
	 * @description 태그 검색 조회
	 * @param tagList
	 * @param limit
	 * @param offset
	 */
	public findByTag(tagList: string[], limit: number, offset: number) {
		return this.createQueryBuilder('e')
			.select(['e.id', 'e.title', 'e.statement'])
			.innerJoin('e.tagList', 't')
			.where('t.tag IN (:tagList)', { tagList })
			.groupBy('e.id')
			.having('COUNT(e.id) = :tagCnt', { tagCnt: tagList.length })
			.orderBy('e.id', 'ASC')
			.limit(limit)
			.offset(offset)
			.getMany();
	}

	/**
	 * @description 제목 검색 조회
	 * @param title
	 * @param take
	 * @param skip
	 */
	public async findByTitle(title: string, take: number, skip: number) {
		return await this.findAndCount({
			select: ['id', 'title', 'statement'],
			where: { title: Like(`%${title}%`) },
			take,
			skip
		});
	}
}