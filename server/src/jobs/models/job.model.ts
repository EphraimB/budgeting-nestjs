import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Account } from 'src/accounts/models/account.model';

@Table
export class Job extends Model {
  @ForeignKey(() => Account)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  accountId!: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
  })
  hourlyRate: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  vacationDays: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  sickDays: number;

  @BelongsTo(() => Account)
  account: Account;
}
