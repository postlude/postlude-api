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

	private async searchByTagNames(tagNames: string[], limit: number, offset: number) {
		const totalCount = await this.devLinkRepository.countByTagNames(tagNames);

		if (!totalCount) {
			return { totalCount, devLinks: [] };
		}

		const fetched = await this.devLinkRepository.findByTagNames(tagNames, limit, offset);

		const devLinks = plainToInstance(SearchDevLinkDto, fetched, { excludeExtraneousValues: true });

		return { totalCount, devLinks };
	}

	private async saveTags(devLinkId: number, tags: TagDto[]) {
		const trimmed = tags.map(({ name }) => ({ name: name.trim() }));

		await this.tagRepository.upsert(trimmed, [ 'name' ]);

		const tagNames = trimmed.map(({ name }) => name);
		const fetched = await this.tagRepository.find({
			where: {
				name: In(tagNames)
			}
		});

		const devLinkTags = fetched.map(({ id }) => ({ devLinkId, tagId: id }));

		await this.devLinkTagRepository.upsert(devLinkTags, [ 'devLinkId', 'tagId' ]);
	}

	@Transactional()
	public async addDevLink(devLinkDto: DevLinkDto) {
		const { title, url, tags } = devLinkDto;

		const { identifiers } = await this.devLinkRepository.insert({ title, url });
		const devLinkId = identifiers[0].id as number;

		await this.saveTags(devLinkId, tags);

		return devLinkId;
	}

	@Transactional()
	public async setDevLink(devLinkId: number, devLinkDto: DevLinkDto) {
		const { title, url, tags } = devLinkDto;

		await this.devLinkRepository.update(devLinkId, { title, url });
		await this.devLinkTagRepository.delete({ devLinkId });
		await this.saveTags(devLinkId, tags);
	}

	public async removeDevLink(devLinkId: number) {
		// dev_link_tag는 DB 테이블의 ON DELETE CASCADE 로 삭제됨
		const result = await this.devLinkRepository.delete(devLinkId);

		if (!result.affected) {
			throw new BadRequestException('not existed data');
		}

		return devLinkId;
	}

	public async getAllTags() {
		return await this.tagRepository.findAllDevLinkTags();
	}

	public async getDevLink(devLinkId: number) {
		const fetched = await this.devLinkRepository.findOne(devLinkId, { relations: [ 'tags' ] });

		if (!fetched) {
			return null;
		}

		return plainToInstance(DevLinkDto, fetched, { excludeExtraneousValues: true });
	}
}