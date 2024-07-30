import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AccountsModule } from './accounts/accounts.module';
import { TransactionHistoryModule } from './transaction-history/transaction-history.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { JobsController } from './jobs/jobs.controller';
import { JobsService } from './jobs/jobs.service';
import { JobsModule } from './jobs/jobs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        username: configService.get<string>('PGUSER'),
        host: configService.get<string>('PGHOST'),
        database: configService.get<string>('PGDATABASE'),
        password: configService.get<string>('PGPASSWORD'),
        port: configService.get<number>('PGPORT'),
        models: [], // Add your models here
        autoLoadModels: true, // Optionally enable auto-loading of models
        synchronize: true,
        define: {
          underscored: true,
        },
      }),
    }),
    AccountsModule,
    TransactionHistoryModule,
    JobsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
