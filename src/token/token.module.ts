import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { TokenService } from './token.service';
import { tokenProviders } from './token.providers';
import { AuthModule } from 'src/auth/auth.module';
import { TokenController } from './token.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [DatabaseModule, forwardRef(() => AuthModule), forwardRef(() => UsersModule)],
  controllers: [TokenController],
  providers: [...tokenProviders, TokenService],
  exports: [TokenService]
})
export class TokenModule {}
