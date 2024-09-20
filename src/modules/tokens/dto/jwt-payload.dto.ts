import { UserModel } from '@modules/users/models/user.model';
import { IJwtPayload } from '@modules/tokens/interfaces/jwt-payload.interface';

export class JwtPayloadDto implements IJwtPayload {
	id: number;
	email: string;

	public static getObjectByUserModel(user: UserModel): IJwtPayload {
		return {
			id: user.id,
			email: user.email
		};
	}
}
