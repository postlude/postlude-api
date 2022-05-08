import { FastifyRequest } from 'fastify';
import { AuthUser } from './auth-user.model';

export interface CustomRequest extends FastifyRequest {
	user: AuthUser
}