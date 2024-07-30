import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Job } from './job.model';

@Table
export class JobSchedule extends Model {
  @ForeignKey(() => Job)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  jobId!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  dayOfWeek: number;

  @Column({
    type: DataType.TIME,
    allowNull: false,
  })
  startTime: string;

  @Column({
    type: DataType.TIME,
    allowNull: false,
  })
  endTime: string;

  @BelongsTo(() => Job)
  job: Job;
}
