import { Entities } from 'src/entities';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const configTypeORM: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'nest',
  entities: [...Entities],
  synchronize: true,
};
