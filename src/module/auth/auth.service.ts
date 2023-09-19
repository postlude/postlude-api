import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserRepository } from 'src/database/repository/user.repository';
import { AuthDto } from './auth.dto';

@Injectable()
export class AuthService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly userRepository: UserRepository
	) {}

	/**
	 * @description 로그인
	 * @param param
	 */
	public async signIn(param: AuthDto) {
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