import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { DevLinkTagRepository } from '../../database/repository/dev-link-tag.repository';
import { DevLinkRepository } from '../../database/repository/dev-link.repository';
import { TagRepository } from '../../database/repository/tag.repository';
import { DevLinkDto, SearchDevLinkParam } from './dev-link.dto';
import { SearchType } from './dev-link.model';

@Injectable()
export class DevLinkService {
	constructor(
		private readonly devLinkRepository: DevLinkRepository,
		private readonly devLinkTagRepository: DevLinkTagRepository,
		private readonly tagRepository: TagRepository
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

	/**
	 * @description 개발 링크 생성
	 * @param devLinkDto
	 */
	@Transactional()
	public async addDevLink(devLinkDto: DevLinkDto) {
		const { title, url, tagList } = devLinkDto;

		// bulk upsert tag
		const tagEntityList = tagList.map((tag) => this.tagRepository.create({ tag }));
		await this.tagRepository.upsert(tagEntityList, {
			conflictPaths: ['tag'],
			skipUpdateIfNoValuesChanged: true
		});
		const upsertedTagList = await this.tagRepository.findByTag(tagList);

		// insert dev_link
		const { identifiers } = await this.devLinkRepository.insert({ title, url });
		const devLinkIdx = identifiers[0].idx as number;

		// bulk insert dev_link_tag
		const devLinkTagList = upsertedTagList.map(({ idx }) => ({ devLinkIdx, tagIdx: idx }));
		await this.devLinkTagRepository.insert(devLinkTagList);
	}
}