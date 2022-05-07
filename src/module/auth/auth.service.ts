import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/database/repository/user.repository';

@Injectable()
export class AuthService {
	constructor(
		private readonly userRepository: UserRepository
	) {}

	async validateUser(email: string, password: string) {
		console.log('AuthService validateUser');
		const user = await this.userRepository.findOne({ email });

		if (user && user.password === password) {
			const { password, ...result } = user;
			return result;
		}
		return null;
	}
}