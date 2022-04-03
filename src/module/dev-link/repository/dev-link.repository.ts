import { EntityRepository, Repository } from 'typeorm';
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
}