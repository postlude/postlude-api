import { BadRequestException, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { DevLinkTagRepository } from '../../database/repository/dev-link-tag.repository';
import { DevLinkRepository } from '../../database/repository/dev-link.repository';
import { DevLinkDto, DevLinkInfo, SearchDevLinkQuery } from './dev-link.dto';

@Injectable()
export class DevLinkService {
	constructor(
		private readonly devLinkRepository: DevLinkRepository,
		private readonly devLinkTagRepository: DevLinkTagRepository
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

				return plainToInstance(DevLinkInfo, {
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
	 * @description 태그 bulk insert
	 * @param devLinkId
	 * @param tags
	 */
	private async saveTags(devLinkId: number, tags: string[]) {
		// 공백 제거 후 중복 제거
		const filtered = Array.from(new Set(tags.map((t) => t.trim())));

		// bulk insert
		const devLinkTags = filtered.map((tag) => this.devLinkTagRepository.create({ devLinkId, tag }));
		await this.devLinkTagRepository.insert(devLinkTags);
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

		await this.saveTags(devLinkId, tags);

		return devLinkId;
	}

	/**
	 * @description 개발 링크 수정
	 * @param devLinkDto
	 */
	@Transactional()
	public async setDevLink(devLinkId: number, devLinkInfo: DevLinkDto) {
		const { title, url, tags } = devLinkInfo;

		await this.devLinkRepository.update(devLinkId, { title, url });
		await this.devLinkTagRepository.delete({ devLinkId });
		await this.saveTags(devLinkId, tags);
	}

	/**
	 * @description 개발 링크 삭제
	 * @param devLinkId
	 */
	public async removeDevLink(devLinkId: number) {
		// dev_link_tag는 onDelete: 'CASCADE'로 삭제됨
		const result = await this.devLinkRepository.delete(devLinkId);

		if (!result.affected) {
			throw new BadRequestException('not existed data');
		}

		return devLinkId;
	}
}