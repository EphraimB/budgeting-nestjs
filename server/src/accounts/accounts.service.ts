import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './models/account.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(Account)
    private accountsModel: typeof Account,
  ) {}

  async findAll(): Promise<any[]> {
    const accounts = await this.accountsModel.findAll();

    // Compute balance for each account
    return Promise.all(
      accounts.map(async (account) => {
        const balance = await account.getBalance();
        return {
          ...account.toJSON(),
          balance,
        };
      }),
    );
  }

  async findOne(id: number): Promise<any> {
    const account = await this.accountsModel.findByPk(id);

    if (!account) {
      throw new NotFoundException(`Account with ID ${id} not found`);
    }

    const balance = await account.getBalance();
    return {
      ...account.toJSON(),
      balance,
    };
  }

  async create(createAccountDto: CreateAccountDto): Promise<Account> {
    return await this.accountsModel.create(createAccountDto as any);
  }

  async update(
    id: number,
    updateAccountDto: UpdateAccountDto,
  ): Promise<Account> {
    const account = await this.accountsModel.findByPk(id);

    if (!account) {
      throw new NotFoundException(`Account with ID ${id} not found`);
    }

    account.update(updateAccountDto);

    return account;
  }

  async delete(id: number): Promise<string> {
    const account = await this.findOne(id);

    if (!account) {
      throw new NotFoundException(`Account with ID of ${id} not found`);
    }

    await account.destroy();

    return 'Account deleted successfully';
  }
}
