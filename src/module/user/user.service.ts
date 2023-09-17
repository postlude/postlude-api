import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from 'src/database/repository/user.repository';
import { UserDto } from './user.dto';

@Injectable()
export class UserService {
	constructor(
		private readonly userRepository: UserRepository
	) {}

	private readonly SALT_OR_ROUNDS = 10;

	/**
	 * @description 유저 생성
	 * @param param
	 */
	public async signUp(param: UserDto) {
		const { email, password } = param;

		const isExist = !!(await this.userRepository.count({ email }));
		if (isExist) {
			throw new ConflictException('DUPLICATED EMAIL');
		}

		const encryptedPassword = await bcrypt.hash(password, this.SALT_OR_ROUNDS);

		const { identifiers } = await this.userRepository.insert({
			email,
			password: encryptedPassword
		});

		return identifiers[0].id as number;
	}
}