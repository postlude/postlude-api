import { FastifyRequest } from 'fastify';

export class LoginUser {
	public idx: number;
	public email: string;
}

export class JwtPayload extends LoginUser {
	iat: number;
	exp: number;
}

export interface CustomRequest extends FastifyRequest {
	user: LoginUser
}
