import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreatePerson1639696544961 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'person',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'age',
            type: 'integer',
          },
          {
            name: 'genre',
            type: 'varchar',
          },
          {
            name: 'nationality',
            type: 'varchar',
          },
          {
            name: 'papel',
            type: 'varchar',
          },
          {
            name: 'movie_id',
            type: 'uuid',
            isArray: true,
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
        ],
        // foreignKeys: [
        //   {
        //     name: 'person_movie_id_fkey',
        //     columnNames: ['movie_id'],
        //     referencedColumnNames: ['id'],
        //     referencedTableName: 'movie',
        //     onDelete: 'SET NULL',
        //     onUpdate: 'CASCADE',
        //   },
        // ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('person');
  }
}
