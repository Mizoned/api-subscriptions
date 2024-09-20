import { Table, Column, Model, HasMany, HasOne } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { SubscriptionsModel } from '@modules/subscriptions/models/subscriptions.model';
import { TokenModel } from '@modules/tokens/models/token.model';

interface UserCreationAttrs {
	email: string;
	password: string;
}

@Table({ tableName: 'users' })
export class UserModel extends Model<UserModel, UserCreationAttrs> {
	@Column({ type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
	id: number;

	@Column({ type: DataTypes.STRING, unique: true, allowNull: true })
	email: string;

	@Column({ type: DataTypes.STRING, allowNull: false })
	password: string;

	@HasOne(() => TokenModel, 'userId')
	token: TokenModel;

	@HasMany(() => SubscriptionsModel, 'userId')
	subscriptions: SubscriptionsModel[];
}
