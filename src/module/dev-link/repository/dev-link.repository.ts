import { EntityRepository, Repository } from 'typeorm';
import { DevLink } from '../../../entity/dev-link.entity';

@EntityRepository(DevLink)
export class DevLinkRepository extends Repository<DevLink> {
	/**
	 * @description 인덱스로 개발 링크 1개 조회
	 * @param devLinkIdx
	 */
	public findOneByIdx(devLinkIdx: number) {
		return this.createQueryBuilder('d')
			.select(['d.idx', 'd.title', 'd.url', 'l.tag'])
			.innerJoin('d.tagList', 'l')
			.where('d.idx = :idx', { idx: devLinkIdx })
			.getOne();
	}
}