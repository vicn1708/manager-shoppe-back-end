import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { DateTimeStamp } from './base.entity';
import { ProductsEntity } from './products.entity';

@Entity({ name: 'images' })
export class ImagesEntity extends DateTimeStamp {
  @Column({ length: 100 })
  public_id: string;

  @Column({ length: 200 })
  uri: string;

  @ManyToOne(() => ProductsEntity, (products) => products.images, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product' })
  product: ProductsEntity;
}
