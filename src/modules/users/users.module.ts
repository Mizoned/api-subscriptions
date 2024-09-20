import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from './models/user.model';
import { UserController } from '@modules/users/user.controller';
import { UserService } from '@modules/users/user.service';

@Module({
	imports: [SequelizeModule.forFeature([UserModel])],
	providers: [UsersService, UserService],
	controllers: [UsersController, UserController],
	exports: [UsersService, UserService]
})
export class UsersModule {}
