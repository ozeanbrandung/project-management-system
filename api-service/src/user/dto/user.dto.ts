import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';

export class TimerSettingsDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  workInterval?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  breakInterval?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(10)
  intervalsCount?: number;
}

export class UserDto extends TimerSettingsDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  @MinLength(6, { message: 'Password must be not less then 6 characters' })
  password?: string;
}
