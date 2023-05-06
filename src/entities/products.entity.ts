import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { DateTimeStamp } from './base.entity';
import { CategoriesEntity } from './categories.entity';
import { ImagesEntity } from './images.entity';
import { OrderDetailsEntity } from './order-details.entity';
import { UsersEntity } from './users.entity';

@Entity({ name: 'products' })
export class ProductsEntity extends DateTimeStamp {
  @Column({ length: 200 })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  sale: number;

  @ManyToMany(() => CategoriesEntity)
  categories: CategoriesEntity[];

  @OneToMany(() => ImagesEntity, (images) => images.product)
  images: ImagesEntity[];

  @ManyToMany(() => UsersEntity)
  carts: UsersEntity[];

  @OneToMany(() => OrderDetailsEntity, (orderDetails) => orderDetails.product)
  order_details: OrderDetailsEntity[];
}
