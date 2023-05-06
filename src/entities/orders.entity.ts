import { Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { DateTimeStamp } from './base.entity';
import { UsersEntity } from './users.entity';
import { OrderDetailsEntity } from './order-details.entity';

@Entity({ name: 'orders' })
export class OrdersEntity extends DateTimeStamp {
  @ManyToOne(() => UsersEntity, (users) => users.orders, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user' })
  user: UsersEntity;

  @OneToMany(() => OrderDetailsEntity, (orderDetails) => orderDetails.order)
  order_details: OrderDetailsEntity[];
}
