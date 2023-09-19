import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {
	constructor(
		private readonly userService: UserService
	) {}

	@Post('/')
	public async signUp(
		@Body() param: UserDto
	) {
		return await this.userService.signUp(param);
	}
}