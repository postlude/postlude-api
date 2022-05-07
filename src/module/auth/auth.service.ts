import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/database/entity/user.entity';
import { UserRepository } from 'src/database/repository/user.repository';

@Injectable()
export class AuthService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly userRepository: UserRepository
	) {}

	async validateUser(email: string, password: string) {
		// console.log('AuthService validateUser');
		const user = await this.userRepository.findOne({ email });

		if (user && user.password === password) {
			const { password, ...result } = user;
			return result;
		}
		return null;
	}

	login(user: User) {
		// const payload = { username: user.username, sub: user.userId };
		const payload = { idx: user.idx };

		return {
			access_token: this.jwtService.sign(payload)
		};
	}
}