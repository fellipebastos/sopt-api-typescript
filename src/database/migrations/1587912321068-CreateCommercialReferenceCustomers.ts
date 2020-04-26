import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateCommercialReferenceCustomers1587912321068
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'commercial_reference_customers',
        columns: [
          {
            name: 'customer_id',
            type: 'varchar',
          },
          {
            name: 'commercial_reference_id',
            type: 'varchar',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'commercial_reference_customers',
      new TableForeignKey({
        name: 'CommercialReferenceCustomer',
        columnNames: ['commercial_reference_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'commercial_references',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'commercial_reference_customers',
      new TableForeignKey({
        name: 'CustomerCommercialReference',
        columnNames: ['customer_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'customers',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('commercial_reference_customers');
  }
}
