import { Injectable } from '@nestjs/common';
import { SearchDevLinkParam } from './dev-link.dto';
import { SearchType } from './dev-link.model';
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

	/**
	 * @description 개발 링크 검색
	 * @param searchParam
	 */
	public async getDevLinkList(searchParam: SearchDevLinkParam) {
		const { type, page, title, tagList }= searchParam;

		const limit = 3;
		const offset = (page - 1) * limit;

		switch (type) {
			case SearchType.Tag : {
				const countList = await this.devLinkRepository.countByTag(tagList);
				const totalCount = countList.length;

				if (totalCount) {
					const devLinkList = await this.devLinkRepository.findByTag(tagList, limit, offset);
					return { totalCount, devLinkList };
				} else {
					return { totalCount, devLinkList: null };
				}
			}
			case SearchType.Title : {
				const [devLinkList, totalCount] = await this.devLinkRepository.findByTitle(title, limit, offset);
				return { totalCount, devLinkList: totalCount ? devLinkList : null };
			}
		}
	}
}