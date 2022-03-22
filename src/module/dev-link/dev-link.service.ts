import { Injectable } from '@nestjs/common';
import { DevLinkRepository } from './repository/dev-link.repository';

@Injectable()
export class DevLinkService {
	constructor(
		private readonly devLinkRepository: DevLinkRepository
	) {}

	/**
	 * @description 개발 링크 1개 조회
	 * @param devLinkIdx
	 */
	public async getDevLink(devLinkIdx: number) {
		const devLinkInfo = await this.devLinkRepository.findOneByIdx(devLinkIdx);

		if (devLinkInfo) {
			const { tagList, ...devLink } = devLinkInfo;

			return {
				devLink,
				tagList: tagList.map((t) => t.tag)
			};
		} else {
			return null;
		}
	}
}