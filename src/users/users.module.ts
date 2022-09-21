import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { usersProviders } from './users.providers';
import { AuthModule } from 'src/auth/auth.module';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports: [DatabaseModule, forwardRef(() => AuthModule), TokenModule],
  controllers: [UsersController],
  providers: [...usersProviders, UsersService],
  exports: [UsersService]
})
export class UsersModule {}
