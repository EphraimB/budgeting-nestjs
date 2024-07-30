import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTransactionHistoryDto } from './dto/create-transaction-history.dto';
import { UpdateTransactionHistoryDto } from './dto/update-transaction-history.dto';
import { TransactionHistoryService } from './transaction-history.service';
import { TransactionHistory } from './models/transaction-history.model';

@Controller('transactions/history')
export class TransactionHistoryController {
  constructor(
    private readonly transactionHistoryService: TransactionHistoryService,
  ) {}

  @Get()
  findAll(): Promise<TransactionHistory[]> {
    return this.transactionHistoryService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<TransactionHistory> {
    try {
      return await this.transactionHistoryService.findOne(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Post()
  async create(
    @Body() createTransactionHistoryDto: CreateTransactionHistoryDto,
  ): Promise<TransactionHistory> {
    return this.transactionHistoryService.create(createTransactionHistoryDto);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTransactionHistoryDto: UpdateTransactionHistoryDto,
  ): Promise<TransactionHistory> {
    return this.transactionHistoryService.update(
      id,
      updateTransactionHistoryDto,
    );
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<string> {
    try {
      return this.transactionHistoryService.delete(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
