import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class UpdateTransactionHistoryDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  account_id?: number;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  amount?: number;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  tax_rate?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;
}
