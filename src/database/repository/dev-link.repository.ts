import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { DevLink } from '../entity/dev-link.entity';

@EntityRepository(DevLink)
export class DevLinkRepository extends BaseRepository<DevLink> {
	private tagSearchBuilder(tagNames: string[]) {
		return this.createQueryBuilder('dl')
			.select([ 'dl.id', 'COUNT(t.id) AS cnt' ])
			.innerJoin('dl.tags', 't')
			.where('t.name IN (:...tagNames)', { tagNames })
			.groupBy('dl.id')
			.having('cnt = :cnt', { cnt: tagNames.length });
	}

	public async countByTagNames(tagNames: string[]) {
		const result = await this.tagSearchBuilder(tagNames)
			.comment('DevLinkRepository.countByTagNames')
			.getRawMany<{ id: number, cnt: number }>();

		return result.length;
	}

	public async findByTagNames(tagNames: string[], limit: number, offset: number) {
		return await this.tagSearchBuilder(tagNames)
			.comment('DevLinkRepository.findByTagNames')
			.addSelect([ 'dl.title', 'dl.url' ])
			.orderBy('dl.id', 'DESC')
			.limit(limit)
			.offset(offset)
			.getMany();
	}
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
			.select([ 'dl.id', 'dlt.tag' ])
			.innerJoin('dl.devLinkTags', 'dlt')
			.where('dl.id = :devLinkId', { devLinkId })
			.getOne();
	}
}