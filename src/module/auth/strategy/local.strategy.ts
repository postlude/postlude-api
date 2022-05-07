import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(
		private authService: AuthService
	) {
		// usernameField 가 없으면 반드시 'username'으로 찾는다(strategy로 들어가지도 않음)
		super({ usernameField: 'email' });
	}

	async validate(email: string, password: string) {
		console.log('LocalStrategy validate');
		const user = await this.authService.validateUser(email, password);
		if (!user) {
			throw new UnauthorizedException();
		}
		return user;
	}
}