import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SubscriptionsModel } from './models/subscriptions.model';
import { CreateSubscriptionDto } from '@modules/subscriptions/dto/create-subscription.dto';
import { UpdateSubscriptionDto } from '@modules/subscriptions/dto/update-subscription.dto';
import { ApiException } from '@common/exceptions/api.exception';

@Injectable()
export class SubscriptionsService {
	constructor(
		@InjectModel(SubscriptionsModel)
		private readonly subscriptionsRepository: typeof SubscriptionsModel
	) {}

	async findAll(userId: number): Promise<SubscriptionsModel[]> {
		return this.subscriptionsRepository.findAll({
			where: { userId }
		});
	}

	async findOne(id: number, userId: number): Promise<SubscriptionsModel> {
		const subscription = await this.subscriptionsRepository.findOne({
			where: { id, userId }
		});

		if (!subscription) {
			throw new ApiException('Подписка не найдена', HttpStatus.NOT_FOUND);
		}

		return subscription;
	}

	async create(
		userId: number,
		subscriptionDto: CreateSubscriptionDto
	): Promise<SubscriptionsModel> {
		try {
			return await this.subscriptionsRepository.create({ ...subscriptionDto, userId });
		} catch (e) {
			throw new ApiException('Не удалось создать подписку', HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async update(
		id: number,
		userId: number,
		subscriptionDto: UpdateSubscriptionDto
	): Promise<SubscriptionsModel> {
		const subscription = await this.subscriptionsRepository.findByPk(id);

		if (!subscription) {
			throw new ApiException('Подписка не найдена', HttpStatus.NOT_FOUND);
		}

		if (subscription.userId !== userId) {
			throw new ApiException('У вас нет прав на обновление подписки', HttpStatus.FORBIDDEN);
		}

		try {
			await subscription.update(subscriptionDto);
			return subscription;
		} catch (e) {
			throw new ApiException(
				'Не удалось обновить данные клиента',
				HttpStatus.INTERNAL_SERVER_ERROR
			);
		}
	}

	async delete(id: number, userId: number): Promise<{ deletedCount: number }> {
		const subscription = await this.subscriptionsRepository.findByPk(id);

		if (!subscription) {
			throw new ApiException('Подписка не найдена', HttpStatus.NOT_FOUND);
		}

		if (subscription.userId !== userId) {
			throw new ApiException('У вас нет прав на удаление подписки', HttpStatus.FORBIDDEN);
		}

		const deletedCount = await this.subscriptionsRepository.destroy({ where: { id } });

		if (deletedCount === 0) {
			throw new ApiException('Не удалось удалить подписку', HttpStatus.INTERNAL_SERVER_ERROR);
		}

		return { deletedCount };
	}
}
