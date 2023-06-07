import { EntityRepository, Like } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { DevLink } from '../entity/dev-link.entity';

@EntityRepository(DevLink)
export class DevLinkRepository extends BaseRepository<DevLink> {
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
	 * @description 단일 태그 검색시 전체 카운트
	 * @param tagName
	 */
	public async countByTag(tagName: string) {
		return await this.createQueryBuilder('dl')
			.innerJoin('dl.tags', 't')
			.where('t.name = :tagName', { tagName })
			.getCount();
	}

	/**
	 * @description 단일 태그 검색 조회
	 * @param tagList
	 * @param limit
	 * @param offset
	 */
	public async findByTag(tagName: string, limit: number, offset: number) {
		return await this.createQueryBuilder('dl')
			.select(['dl.id', 'dl.title', 'dl.url'])
			.innerJoin('dl.tags', 't')
			.where('t.name = :tagName', { tagName })
			.orderBy('dl.id', 'ASC')
			.limit(limit)
			.offset(offset)
			.getMany();
	}

	public async findTagsById(devLinkId: number) {
		return await this.createQueryBuilder('dl')
			.select(['dl.id', 't.name'])
			.innerJoin('dl.tags', 't')
			.where('dl.id = :devLinkId', { devLinkId })
			.getOne();
	}

	/**
	 * @description 제목 검색 조회
	 * @param title
	 * @param take
	 * @param skip
	 */
	public async findByTitle(title: string, take: number, skip: number) {
		return await this.findAndCount({
			select: ['id', 'title', 'url'],
			where: { title: Like(`%${title}%`) },
			take,
			skip
		});
	}
}