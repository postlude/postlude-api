import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignDto {
	@IsEmail()
	public email: string;

	@IsNotEmpty()
	public password: string;
}