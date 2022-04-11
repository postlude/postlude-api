import { Tag } from 'src/database/entity/tag.entity';
import { EntityRepository, In } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

@EntityRepository(Tag)
export class TagRepository extends BaseRepository<Tag> {
	public findByTag(tagList: string[]) {
		return this.find({
			select: ['idx'],
			where: {
				tag: In(tagList)
			}
		});
	}
}