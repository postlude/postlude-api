import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthUser } from '../auth-user.model';

class JwtPayload extends AuthUser {
	iat: number;
	exp: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: 'local'
		});
	}

	validate(payload: JwtPayload) {
		const { idx, email } = payload;
		return { idx, email };
	}
}