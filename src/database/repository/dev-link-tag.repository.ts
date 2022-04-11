import { DevLinkTag } from 'src/database/entity/dev-link-tag.entity';
import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

@EntityRepository(DevLinkTag)
export class DevLinkTagRepository extends BaseRepository<DevLinkTag> {}