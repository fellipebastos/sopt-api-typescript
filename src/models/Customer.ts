import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Entity,
} from 'typeorm';

@Entity('customers')
class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  corporate_name: string;

  @Column()
  cnpj: string;

  @Column()
  state_registration: string;

  @Column()
  phone: string;

  @Column()
  cell_phone: string;

  @Column()
  email: string;

  @Column()
  email_nfe: string;

  @Column()
  email_fin: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}

export default Customer;
