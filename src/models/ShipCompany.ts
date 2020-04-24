import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Entity,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

import slugify from '../utils/slugify';

@Entity('ship_companies')
class ShipCompany {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @BeforeInsert()
  @BeforeUpdate()
  private fillSlug(): void {
    this.slug = slugify(this.name);
  }
}

export default ShipCompany;
