import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

@Injectable()
export class MysqlConnectService implements TypeOrmOptionsFactory {

  constructor(
    private readonly configService: ConfigService
  ) { }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.configService.get<string>('DATABASE_HOST'),
      port: +this.configService.get<number>('DATABASE_PORT'),
      username: this.configService.get('DATABASE_USERNAME'),
      password: this.configService.get('DATABASE_PASSWORD'),
      database: this.configService.get('DATABASE_DATABASE'),
      entities: [__dirname + '/../**/**/*.entity{.ts,.js}'],
      synchronize: true,
    }
  }
}