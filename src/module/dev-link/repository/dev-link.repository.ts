import { EntityRepository, Like, Repository } from 'typeorm';
import { DevLink } from '../../../entity/dev-link.entity';

@EntityRepository(DevLink)
export class DevLinkRepository extends Repository<DevLink> {
	/**
	 * @description 인덱스로 개발 링크 1개 조회
	 * @param devLinkIdx
	 */
	public findOneByIdx(devLinkIdx: number) {
		return this.createQueryBuilder('l')
			.select(['l.idx', 'l.title', 'l.url', 't.tag'])
			.innerJoin('l.tagList', 't')
			.where('l.idx = :devLinkIdx', { devLinkIdx })
			.getOne();
	}

	/**
	 * @description 태그 검색시 전체 카운트
	 * @param tagList
	 */
	public async countByTag(tagList: string[]) {
		return await this.createQueryBuilder('l')
			.select('l.idx')
			.innerJoin('l.tagList', 't')
			.where('t.tag IN (:tagList)', { tagList })
			.groupBy('l.idx')
			.having('COUNT(l.idx) = :tagCnt', { tagCnt: tagList.length })
			.getMany();
	}

	/**
	 * @description 태그 검색 조회
	 * @param tagList
	 * @param limit
	 * @param offset
	 */
	public findByTag(tagList: string[], limit: number, offset: number) {
		return this.createQueryBuilder('l')
			.select(['l.idx', 'l.title', 'l.url'])
			.innerJoin('l.tagList', 't')
			.where('t.tag IN (:tagList)', { tagList })
			.groupBy('l.idx')
			.having('COUNT(l.idx) = :tagCnt', { tagCnt: tagList.length })
			.orderBy('l.idx', 'ASC')
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
			select: ['idx', 'title', 'url'],
			where: { title: Like(`%${title}%`) },
			take,
			skip
		});
	}
}