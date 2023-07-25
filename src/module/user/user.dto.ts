import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
	@IsEmail()
	public email: string;

	@IsString()
	@IsNotEmpty()
	public password: string;
}