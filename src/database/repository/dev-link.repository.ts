import { EntityRepository, Like } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { DevLink } from '../entity/dev-link.entity';

@EntityRepository(DevLink)
export class DevLinkRepository extends BaseRepository<DevLink> {
	/**
	 * @description 단일 태그 검색시 전체 카운트
	 * @param tag
	 */
	public async countByTag(tag: string) {
		return await this.createQueryBuilder('dl')
			.innerJoin('dl.devLinkTags', 'dlt')
			.where('dlt.tag = :tag', { tag })
			.getCount();
	}

	/**
	 * @description 단일 태그 검색 조회
	 * @param tagList
	 * @param limit
	 * @param offset
	 */
	public async findByTag(tag: string, limit: number, offset: number) {
		return await this.createQueryBuilder('dl')
			.select(['dl.id', 'dl.title', 'dl.url'])
			.innerJoin('dl.devLinkTags', 'dlt')
			.where('dlt.tag = :tag', { tag: tag })
			.orderBy('dl.id', 'DESC')
			.limit(limit)
			.offset(offset)
			.getMany();
	}

	public async findTagsById(devLinkId: number) {
		return await this.createQueryBuilder('dl')
			.select(['dl.id', 'dlt.tag'])
			.innerJoin('dl.devLinkTags', 'dlt')
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