import { forwardRef, Module } from '@nestjs/common';
import { CompanysService } from './companys.service';
import { CompanysController } from './companys.controller';
import { DatabaseModule } from 'src/database/database.module';
import { CompanysProviders } from './companys.providers';
import { TokenModule } from 'src/token/token.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CompanysController],
  providers: [...CompanysProviders, CompanysService],
  exports: [CompanysService]
})
export class CompanysModule {}

