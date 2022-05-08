import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CustomRequest } from '../request.model';

export const Auth = createParamDecorator(
	(data: unknown, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest<CustomRequest>();
		return request.user;
	}
);