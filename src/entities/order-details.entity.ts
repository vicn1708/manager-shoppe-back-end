import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { DateTimeStamp } from './base.entity';
import { ProductsEntity } from './products.entity';
import { OrdersEntity } from './orders.entity';

@Entity({ name: 'order_details' })
export class OrderDetailsEntity extends DateTimeStamp {
  @Column('int')
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  unit_price: number;

  @ManyToOne(() => ProductsEntity, (products) => products.order_details)
  @JoinColumn({ name: 'product' })
  product: ProductsEntity;

  @ManyToOne(() => OrdersEntity, (orders) => orders.order_details)
  @JoinColumn({ name: 'order' })
  order: OrdersEntity;
}
