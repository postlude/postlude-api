import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { Tag } from '../entity/tag.entity';

@EntityRepository(Tag)
export class TagRepository extends BaseRepository<Tag> {
	public async findAllDevLinkTags() {
		return await this.createQueryBuilder('t')
			.comment('TagRepository.findAllDevLinkTags')
			.select([ 't.name AS name', 'COUNT(t.id) AS cnt' ])
			.innerJoin('t.devLinks', 'dl')
			.groupBy('t.id')
			.orderBy('cnt', 'DESC')
			.getRawMany<{ name: string, cnt: number }>();
	}
}