import {
  Column,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
  DataType,
} from 'sequelize-typescript';
import { Account } from 'src/accounts/models/account.model';

@Table
export class TransactionHistory extends Model {
  @ForeignKey(() => Account)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  accountId!: number;

  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
    get() {
      const value = this.getDataValue('amount');
      return parseFloat(value);
    },
  })
  amount!: number;

  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
    get() {
      const value = this.getDataValue('taxRate');
      return parseFloat(value);
    },
  })
  taxRate!: number;

  @Column({ type: DataType.TEXT, allowNull: false })
  title!: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  description!: string;

  @BelongsTo(() => Account)
  account: Account;
}
