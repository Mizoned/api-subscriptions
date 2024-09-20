import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SubscriptionsService } from './subscriptions.service';
import { CurrentUser } from '@common/decorators/current-user.decorator';
import { IJwtPayload } from '@modules/tokens/interfaces/jwt-payload.interface';
import { CreateSubscriptionDto } from '@modules/subscriptions/dto/create-subscription.dto';
import { UpdateSubscriptionDto } from '@modules/subscriptions/dto/update-subscription.dto';

@ApiTags('Подписки пользователя')
@Controller('subscriptions')
export class SubscriptionsController {
	constructor(private readonly customersService: SubscriptionsService) {}

	@ApiOperation({ summary: 'Получение всех подписок' })
	@Get('/')
	async findAll(@CurrentUser() user: IJwtPayload) {
		return await this.customersService.findAll(user.id);
	}

	@ApiOperation({ summary: 'Получение подписки по id' })
	@Get('/:id')
	async findOne(@Param('id') id: number, @CurrentUser() user: IJwtPayload) {
		return await this.customersService.findOne(id, user.id);
	}

	@ApiOperation({ summary: 'Создание подписки' })
	@Post('/')
	public async create(
		@CurrentUser() user: IJwtPayload,
		@Body() customerDto: CreateSubscriptionDto
	) {
		return await this.customersService.create(user.id, customerDto);
	}

	@ApiOperation({ summary: 'Обновление подписки' })
	@Put(':id')
	public async update(
		@Param('id') id: number,
		@CurrentUser() user: IJwtPayload,
		@Body() customerDto: UpdateSubscriptionDto
	) {
		return await this.customersService.update(id, user.id, customerDto);
	}

	@ApiOperation({ summary: 'Удаление подписки' })
	@Delete(':id')
	public async delete(@Param('id') id: number, @CurrentUser() user: IJwtPayload) {
		return await this.customersService.delete(id, user.id);
	}
}
