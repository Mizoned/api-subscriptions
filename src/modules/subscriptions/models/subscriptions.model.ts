import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { UserModel } from '@modules/users/models/user.model';

interface SubscriptionsCreationAttrs {
	name: string;
	price: number;
	dateStart: string;
	dateEnd: string;
	userId: number;
}

@Table({ tableName: 'subscriptions' })
export class SubscriptionsModel extends Model<SubscriptionsModel, SubscriptionsCreationAttrs> {
	@Column({ type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
	id: number;

	@Column({ type: DataTypes.STRING, allowNull: false })
	name: string;

	@Column({ type: DataTypes.FLOAT, allowNull: false })
	price: number;

	@Column({ type: DataTypes.DATEONLY })
	dateStart: string;

	@Column({ type: DataTypes.DATEONLY })
	dateEnd: string;

	@ForeignKey(() => UserModel)
	@Column({ type: DataTypes.INTEGER, allowNull: false })
	userId: number;

	@BelongsTo(() => UserModel, 'userId')
	user: UserModel;
}
