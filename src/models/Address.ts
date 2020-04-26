import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import Customer from './Customer';

@Entity('addresses')
class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  customer_id: string;

  @OneToOne(() => Customer, { lazy: true })
  @JoinColumn({ name: 'customer_id' })
  company: Customer;

  @Column()
  name: string;

  @Column()
  street: string;

  @Column()
  complement: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column()
  zip_code: string;

  @Column()
  neighborhood: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Address;
