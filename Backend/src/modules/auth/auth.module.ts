import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { UsersRepository } from 'src/modules/users/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/modules/users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [AuthService, AuthRepository, UsersRepository],
  controllers: [AuthController],
})
export class AuthModule {}
