import { forwardRef, Module } from '@nestjs/common';
import { CompanysService } from './companys.service';
import { CompanysController } from './companys.controller';
import { DatabaseModule } from 'src/database/database.module';
import { CompanysProviders } from './companys.providers';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports: [DatabaseModule, forwardRef(() => AuthModule), forwardRef(() => TokenModule)],
  controllers: [CompanysController],
  providers: [...CompanysProviders, CompanysService],
  exports: [CompanysService]
})
export class CompanysModule {}

