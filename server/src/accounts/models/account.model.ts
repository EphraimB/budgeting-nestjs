import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { TransactionHistory } from 'src/transaction-history/models/transaction-history.model';
@Table
export class Account extends Model {
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  name!: string;

  @HasMany(() => TransactionHistory)
  transactionHistories: TransactionHistory[];

  async getBalance(): Promise<number> {
    const transactions = await TransactionHistory.findAll({
      where: { accountId: this.id },
    });
    const balance = transactions.reduce((total, transaction) => {
      const amountWithTax =
        transaction.amount + transaction.amount * transaction.taxRate;
      return total + amountWithTax;
    }, 0);

    return balance;
  }
}
