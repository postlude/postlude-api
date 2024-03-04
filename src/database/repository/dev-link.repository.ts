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

	private titleSearchBuilder(title: string) {
		const booleanModeTitle = `${title}*`;

		return this.createQueryBuilder('dl')
			.where('MATCH(dl.title) AGAINST (:booleanModeTitle IN BOOLEAN MODE)', { booleanModeTitle });
	}

	public async countByTitle(title: string) {
		return await this.titleSearchBuilder(title)
			.comment('DevLinkRepository.countByTitle')
			.getCount();
	}

	public async findByTitle(title: string, limit: number, offset: number) {
		return await this.titleSearchBuilder(title)
			.comment('DevLinkRepository.findByTitle')
			.select([ 'dl.id', 'dl.title', 'dl.url' ])
			.limit(limit)
			.offset(offset)
			.getMany();
	}
}