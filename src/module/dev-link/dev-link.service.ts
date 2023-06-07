import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { DevLinkTagRepository } from '../../database/repository/dev-link-tag.repository';
import { DevLinkRepository } from '../../database/repository/dev-link.repository';
import { TagRepository } from '../../database/repository/tag.repository';
import { DevLinkDto, SearchDevLinkQuery, SetDevLinkDto } from './dev-link.dto';

@Injectable()
export class DevLinkService {
	constructor(
		private readonly devLinkRepository: DevLinkRepository,
		private readonly devLinkTagRepository: DevLinkTagRepository,
		private readonly tagRepository: TagRepository
	) {}

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
				const tags = dl.devLinkTags.map(({ tag }) => tag);

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
	 * @param tagNames
	 */
	private async saveTag(devLinkId: number, tagNames: string[]) {
		// bulk upsert tag
		const tagEntityList = tagNames.map((name) => this.tagRepository.create({ name }));
		await this.tagRepository.upsert(tagEntityList, {
			conflictPaths: ['name'],
			skipUpdateIfNoValuesChanged: true
		});
		const upsertedTagList = await this.tagRepository.findByNames(tagNames);

		// bulk insert dev_link_tag
		const devLinkTagList = upsertedTagList.map(({ id }) => ({ devLinkId, tagId: id }));
		await this.devLinkTagRepository.insert(devLinkTagList);
	}

	/**
	 * @description 개발 링크 생성
	 * @param devLinkDto
	 */
	@Transactional()
	public async addDevLink(devLinkDto: Omit<DevLinkDto, 'id'>) {
		const { title, url, tags } = devLinkDto;

		const { identifiers } = await this.devLinkRepository.insert({ title, url });
		const devLinkId = identifiers[0].id as number;

		// 공백 제거 후 중복 제거
		const filtered = Array.from(new Set(tags.map((t) => t.trim())));

		// bulk insert
		const devLinkTags = filtered.map((tag) => this.devLinkTagRepository.create({ devLinkId, tag }));
		await this.devLinkTagRepository.insert(devLinkTags);

		return devLinkId;
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

		return devLinkId;
	}
}