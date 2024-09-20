import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { VALIDATION_ERROR } from '@constants/messages/validation';

export class CreateSubscriptionDto {
	@ApiProperty({ example: 'Подписка', description: 'name' })
	@IsString({ message: VALIDATION_ERROR.IS_STRING })
	@IsNotEmpty({ message: VALIDATION_ERROR.IS_NOT_EMPTY })
	name: string;

	@ApiProperty({ example: '199', description: 'price' })
	@IsNotEmpty({ message: VALIDATION_ERROR.IS_NOT_EMPTY })
	@IsNumber({}, { message: VALIDATION_ERROR.IS_PRICE })
	price: number;

	@ApiProperty({ example: '2024-09-16', description: 'dateStart' })
	@IsString({ message: VALIDATION_ERROR.IS_STRING })
	dateStart: string;

	@ApiProperty({ example: '2024-09-16', description: 'dateEnd' })
	@IsNotEmpty({ message: VALIDATION_ERROR.IS_NOT_EMPTY })
	dateEnd: string;
}
