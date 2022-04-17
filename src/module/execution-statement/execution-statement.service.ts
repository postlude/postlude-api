import { Injectable } from '@nestjs/common';
import { ExecutionStatementTagRepository } from 'src/database/repository/execution-statement-tag.repository';
import { ExecutionStatementRepository } from 'src/database/repository/execution-statement.repository';
import { TagRepository } from 'src/database/repository/tag.repository';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { AddExecutionStatementDto, SetExecutionStatementDto } from './execution-statement.dto';

@Injectable()
export class ExecutionStatementService {
	constructor(
		private readonly executionStatementRepository: ExecutionStatementRepository,
		private readonly executionStatementTagRepository: ExecutionStatementTagRepository,
		private readonly tagRepository: TagRepository
	) {}

	/**
	 * @description 실행문 1개 조회
	 * @param executionStatmentIdx
	 */
	public async getExecutionStatement(executionStatmentIdx: number) {
		const executionStatementInfo = await this.executionStatementRepository.findOneByIdx(executionStatmentIdx);

		if (executionStatementInfo) {
			const { tagList, ...executionStatment } = executionStatementInfo;
			return {
				executionStatment,
				tagList: tagList.map((t) => t.tag)
			};
		} else {
			return null;
		}
	}

	/**
	 * @description 태그, 태그 연결 생성
	 * @param executionStatementIdx
	 * @param tagList
	 */
	private async saveTag(executionStatementIdx: number, tagList: string[]) {
		// bulk upsert tag
		const tagEntityList = tagList.map((tag) => this.tagRepository.create({ tag }));
		await this.tagRepository.upsert(tagEntityList, {
			conflictPaths: ['tag'],
			skipUpdateIfNoValuesChanged: true
		});
		const upsertedTagList = await this.tagRepository.findByTag(tagList);

		// bulk insert execution_statement_tag
		const executionStatementTagList = upsertedTagList.map(({ idx }) => ({ executionStatementIdx, tagIdx: idx }));
		await this.executionStatementTagRepository.insert(executionStatementTagList);
	}

	/**
	 * @description 실행문 생성
	 * @param executionStatementDto
	 */
	@Transactional()
	public async addExecutionStatement(executionStatementDto: AddExecutionStatementDto) {
		const { tagList, ...executionStatement } = executionStatementDto;

		const { identifiers } = await this.executionStatementRepository.insert(executionStatement);
		const executionStatementIdx = identifiers[0].idx as number;

		await this.saveTag(executionStatementIdx, tagList);
	}

	/**
	 * @description 실행문 수정
	 * @param executionStatementDto
	 */
	@Transactional()
	public async setExecutionStatement(executionStatementDto: SetExecutionStatementDto) {
		const { tagList, idx, ...executionStatement } = executionStatementDto;

		await this.executionStatementRepository.update(idx, executionStatement);
		await this.executionStatementTagRepository.delete({ executionStatementIdx: idx });
		await this.saveTag(idx, tagList);
	}
}