import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtConfig } from 'src/config/config.model';
import { JwtPayload } from '../auth.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(configService: ConfigService<JwtConfig>) {
		const secretOrKey = configService.get('JWT_SECRET', { infer: true });

		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey
		});
	}

	validate(payload: JwtPayload) {
		const { id, email } = payload;
		return { id, email };
	}
}