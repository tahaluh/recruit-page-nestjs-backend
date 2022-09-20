import { Module } from '@nestjs/common';
import { CompanysService } from './companys.service';
import { CompanysController } from './companys.controller';
import { DatabaseModule } from 'src/database/database.module';
import { CompanysProviders } from './companys.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [CompanysController],
  providers: [...CompanysProviders, CompanysService]
})
export class CompanysModule {}
