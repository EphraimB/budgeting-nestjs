import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionHistoryDto } from './dto/create-transaction-history.dto';
import { UpdateTransactionHistoryDto } from './dto/update-transaction-history.dto';
import { TransactionHistory } from './models/transaction-history.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class TransactionHistoryService {
  constructor(
    @InjectModel(TransactionHistory)
    private transactionHistoryModel: typeof TransactionHistory,
  ) {}

  async findAll(): Promise<TransactionHistory[]> {
    return this.transactionHistoryModel.findAll();
  }

  async findOne(id: number): Promise<TransactionHistory> {
    return this.transactionHistoryModel.findByPk(id);
  }

  async create(
    createTransactionHistoryDto: CreateTransactionHistoryDto,
  ): Promise<TransactionHistory> {
    return this.transactionHistoryModel.create(
      createTransactionHistoryDto as any,
    );
  }

  async update(
    id: number,
    updateTransactionHistoryDto: UpdateTransactionHistoryDto,
  ): Promise<TransactionHistory> {
    const transactionHistory = await this.transactionHistoryModel.findByPk(id);

    if (!transactionHistory) {
      throw new NotFoundException(
        `Transaction history with ID ${id} not found`,
      );
    }

    await transactionHistory.update(updateTransactionHistoryDto);

    return transactionHistory;
  }

  async delete(id: number): Promise<string> {
    const transactionHistory = await this.findOne(id);

    if (!transactionHistory) {
      throw new NotFoundException(
        `Transaction history with ID of ${id} not found`,
      );
    }

    await transactionHistory.destroy();

    return 'Transaction history deleted successfully';
  }
}