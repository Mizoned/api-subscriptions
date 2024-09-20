import { IsEmail, IsOptional, IsString } from 'class-validator';
import { VALIDATION_ERROR } from '@constants/messages/validation';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
	@ApiProperty({ example: 'Валерий', description: 'Имя' })
	@IsString({ message: VALIDATION_ERROR.IS_STRING })
	@IsEmail({}, { message: VALIDATION_ERROR.IS_EMAIL })
	@IsOptional()
	email?: string;
}
