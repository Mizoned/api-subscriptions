import { ApiProperty } from '@nestjs/swagger';
import { UserModel } from '@modules/users/models/user.model';

export class ResponseUserDto {
	@ApiProperty({ example: 'user@mail.ru', description: 'Email' })
	email: string;

	static createResponseUser(userModel: UserModel): ResponseUserDto {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, ...user } = userModel.dataValues;

		return {
			...user
		};
	}
}
