import * as bcrypt from 'bcrypt';
import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/database/repository/user.repository';
import { SignDto } from './user.dto';

@Injectable()
export class UserService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly userRepository: UserRepository
	) {}

	private readonly SALT_OR_ROUNDS = 10;

	/**
	 * @description 유저 생성
	 * @param param
	 */
	public async signUp(param: SignDto) {
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

		return identifiers[0].idx as number;
	}

	/**
	 * @description 로그인
	 * @param param
	 */
	public async signIn(param: SignDto) {
		const { email, password: inputPassword } = param;

		const user = await this.userRepository.findOne({ email });

		if (user) {
			const { id, email, password } = user;

			const isSame = await bcrypt.compare(inputPassword, password);
			if (isSame) {
				return this.jwtService.sign({ id, email });
			}
		}

		throw new UnauthorizedException();
	}
}