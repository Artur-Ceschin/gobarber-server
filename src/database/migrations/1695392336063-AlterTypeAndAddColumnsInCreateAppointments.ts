import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AlterTypeAndAddColumnsInCreateAppointments1695392336063
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'appointments',
      'id',
      new TableColumn({
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()',
      }),
    )

    await queryRunner.changeColumn(
      'appointments',
      'date',
      new TableColumn({
        name: 'date',
        type: 'varchar',
      }),
    )

    await queryRunner.changeColumn(
      'appointments',
      'created_at',
      new TableColumn({
        name: 'created_at',
        type: 'timestamp',
        default: 'now()',
      }),
    )

    await queryRunner.changeColumn(
      'appointments',
      'updated_at',
      new TableColumn({
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'appointments',
      'id',
      new TableColumn({
        name: 'id',
        type: 'varchar',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()',
      }),
    )

    await queryRunner.changeColumn(
      'appointments',
      'date',
      new TableColumn({
        name: 'date',
        type: 'timestamp with time zone',
        isNullable: false,
      }),
    )

    await queryRunner.changeColumn(
      'appointments',
      'created_at',
      new TableColumn({
        name: 'created_at',
        type: 'timestamp with time zone',
        isNullable: false,
      }),
    )

    await queryRunner.changeColumn(
      'appointments',
      'updated_at',
      new TableColumn({
        name: 'updated_at',
        type: 'timestamp with time zone',
        isNullable: false,
      }),
    )
  }
}
