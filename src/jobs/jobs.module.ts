import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { JobsProviders } from './jobs.providers';
import { DatabaseModule } from 'src/database/database.module';
import { TokenModule } from 'src/token/token.module';
import { CompanysModule } from 'src/companys/companys.module';

@Module({
  imports: [DatabaseModule, TokenModule, CompanysModule],
  controllers: [JobsController],
  providers: [...JobsProviders, JobsService]
})
export class JobsModule {}
