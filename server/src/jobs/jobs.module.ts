import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Job } from './models/job.model';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import { JobSchedule } from './models/job-schedule.model';

@Module({
  imports: [SequelizeModule.forFeature([Job, JobSchedule])],
  controllers: [JobsController],
  providers: [JobsService],
})
export class JobsModule {}
