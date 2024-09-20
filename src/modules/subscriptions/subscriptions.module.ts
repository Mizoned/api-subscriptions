import { Module } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionsController } from './subscriptions.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { SubscriptionsModel } from './models/subscriptions.model';

@Module({
	imports: [SequelizeModule.forFeature([SubscriptionsModel])],
	providers: [SubscriptionsService],
	controllers: [SubscriptionsController],
	exports: [SubscriptionsService]
})
export class SubscriptionsModule {}
