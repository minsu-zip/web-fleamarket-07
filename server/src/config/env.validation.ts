import { plainToInstance } from 'class-transformer';
import { IsEnum, IsNumber, IsString, validateSync } from 'class-validator';
import { Algorithm } from 'jsonwebtoken';

export enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Provision = 'provision',
}

class EnvironmentVariables {
  @IsNumber()
  PORT = 5000;

  @IsEnum(Environment)
  NODE_ENV: Environment = Environment.Production;

  @IsString()
  DB_HOST: string;

  @IsString()
  DB_NAME: string;

  @IsString()
  DB_USER: string;

  @IsString()
  DB_PASS: string;

  @IsNumber()
  DB_PORT = 3306;

  @IsString()
  FRONT_URL: string;

  @IsString()
  GITHUB_ID: string;

  @IsString()
  GITHUB_SECRET: string;

  @IsString()
  JWT_KEY: string;

  @IsString()
  JWT_ALG: Algorithm;

  @IsNumber()
  JWT_EXP: number;

  @IsString()
  JWT_ISSUER: string;

  @IsString()
  AWS_BUCKET_NAME: string;

  @IsString()
  AWS_ACCESS_KEY: string;

  @IsString()
  AWS_SECRET_KEY: string;

  @IsString()
  AWS_REGION: string;

  @IsNumber()
  SOCKET_PORT: number;
}

export function validateEnv(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
