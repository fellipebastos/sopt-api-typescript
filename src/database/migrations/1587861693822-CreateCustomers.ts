import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateCustomers1587861693822
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'customers',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'corporate_name',
            type: 'varchar',
          },
          {
            name: 'cnpj',
            type: 'char(14)',
          },
          {
            name: 'state_registration',
            type: 'char(20)',
          },
          {
            name: 'phone',
            type: 'char(20)',
            isNullable: true,
          },
          {
            name: 'cell_phone',
            type: 'char(20)',
            isNullable: true,
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'email_nfe',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'email_fin',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
            default: null,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('customers');
  }
}
