import { Entity, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { DateTimeStamp } from './base.entity';
import { OrdersEntity } from './orders.entity';
import { RolesUser } from 'src/constants/roles.constant';
import { ProductsEntity } from './products.entity';

@Entity({ name: 'users' })
export class UsersEntity extends DateTimeStamp {
  @Column({ length: 50, unique: true })
  username: string;

  @Column({ length: 50, unique: true })
  email: string;

  @Column({ length: 200 })
  password: string;

  @Column({ length: 1000, nullable: true })
  refresh_token: string;

  @Column({
    type: 'enum',
    enum: RolesUser,
    default: RolesUser.USER,
  })
  roles: string;

  @ManyToMany(() => ProductsEntity)
  @JoinTable({
    name: 'carts',
    joinColumns: [{ name: 'carts' }],
    inverseJoinColumns: [{ name: 'products' }],
  })
  carts: ProductsEntity[];

  @OneToMany(() => OrdersEntity, (orders) => orders.user)
  orders: OrdersEntity[];
}
