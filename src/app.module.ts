import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CompanysModule } from './companys/companys.module';
import { JobsModule } from './jobs/jobs.module';

@Module({
  imports: [UsersModule, CompanysModule, JobsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
