import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Job } from './models/job.model';
import { JobSchedule } from './models/job-schedule.model';

@Injectable()
export class JobsService {
  constructor(
    @InjectModel(Job)
    private readonly jobModel: typeof Job,
    @InjectModel(JobSchedule)
    private readonly jobScheduleModel: typeof JobSchedule,
  ) {}

  findAll(): Promise<Job[]> {
    return this.jobModel.findAll({
      include: [JobSchedule],
    });
  }

  async findOne(id: number): Promise<Job> {
    const job = this.jobModel.findByPk(id, {
      include: [JobSchedule],
    });

    if (!job) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }

    return job;
  }
}
