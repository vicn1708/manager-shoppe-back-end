import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { DateTimeStamp } from './base.entity';
import { ProductsEntity } from './products.entity';

@Entity({ name: 'categories' })
export class CategoriesEntity extends DateTimeStamp {
  @Column({ length: 200 })
  name: string;

  @Column({ length: 10 })
  status: string;

  @ManyToMany(() => ProductsEntity)
  @JoinTable({
    name: 'product_portfolio',
    joinColumns: [{ name: 'category' }],
    inverseJoinColumns: [{ name: 'product' }],
  })
  products: ProductsEntity[];
}
