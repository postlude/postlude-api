import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { DevLinkTagRepository } from '../../database/repository/dev-link-tag.repository';
import { DevLinkRepository } from '../../database/repository/dev-link.repository';
import { TagRepository } from '../../database/repository/tag.repository';
import { AddDevLinkDto, DevLinkDto, SearchDevLinkQuery, SetDevLinkDto } from './dev-link.dto';
import { plainToInstance } from 'class-transformer';

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
			const { tags: tagList, ...devLink } = devLinkInfo;

			return {
				devLink,
				tagList: tagList.map((t) => t.name)
			};
		} else {
			return null;
		}
	}

	/**
	 * @description 개발 링크 검색(일단 단일 태그 검색만)
	 * @param searchParam
	 */
	public async search(searchParam: SearchDevLinkQuery) {
		const { page, tagName }= searchParam;

		const limit = 10;
		const offset = (page - 1) * limit;

		const totalCount = await this.devLinkRepository.countByTag(tagName);

		if (totalCount) {
			// 단일 태그 검색
			const devLinkList = await this.devLinkRepository.findByTag(tagName, limit, offset);

			// 해당 개발 링크의 모든 태그 조회
			const promises = devLinkList.map(({ id }) => this.devLinkRepository.findTagsById(id));
			const tagList = await Promise.all(promises);

			const devLinks = devLinkList.map((devLink) => {
				const dl = tagList.find((dl) => dl.id === devLink.id);
				const tags = dl.tags.map(({ name }) => name);

				return plainToInstance(DevLinkDto, {
					...devLink,
					tags
				}, {
					excludeExtraneousValues: true
				});
			});

			return { totalCount, devLinks };
		} else {
			return { totalCount, devLinks: null };
		}
	}

	/**
	 * @description 태그, 태그 연결 생성
	 * @param devLinkId
	 * @param tagList
	 */
	private async saveTag(devLinkId: number, tagList: string[]) {
		// bulk upsert tag
		const tagEntityList = tagList.map((tag) => this.tagRepository.create({ name: tag }));
		await this.tagRepository.upsert(tagEntityList, {
			conflictPaths: ['tag'],
			skipUpdateIfNoValuesChanged: true
		});
		const upsertedTagList = await this.tagRepository.findByTag(tagList);

		// bulk insert dev_link_tag
		const devLinkTagList = upsertedTagList.map(({ id }) => ({ devLinkId, tagId: id }));
		await this.devLinkTagRepository.insert(devLinkTagList);
	}

	/**
	 * @description 개발 링크 생성
	 * @param devLinkDto
	 */
	@Transactional()
	public async addDevLink(devLinkDto: AddDevLinkDto) {
		const { title, url, tagList } = devLinkDto;

		const { identifiers } = await this.devLinkRepository.insert({ title, url });
		const devLinkIdx = identifiers[0].idx as number;

		await this.saveTag(devLinkIdx, tagList);
	}

	/**
	 * @description 개발 링크 수정
	 * @param devLinkDto
	 */
	@Transactional()
	public async setDevLink(devLinkDto: SetDevLinkDto) {
		const { idx, title, url, tagList } = devLinkDto;

		await this.devLinkRepository.update(idx, { title, url });
		await this.devLinkTagRepository.delete({ devLinkId: idx });
		await this.saveTag(idx, tagList);
	}

	/**
	 * @description 개발 링크 삭제
	 * @param devLinkId
	 */
	@Transactional()
	public async removeDevLink(devLinkId: number) {
		await this.devLinkTagRepository.delete({ devLinkId });
		await this.devLinkRepository.delete(devLinkId);
	}
}