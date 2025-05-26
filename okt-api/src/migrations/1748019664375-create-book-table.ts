import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateBookTable1748019664375 implements MigrationInterface {
    name = 'CreateBookTable1748019664375'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "books" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "author" character varying NOT NULL, "year" character varying NOT NULL, "status" character varying NOT NULL, CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "books"`);
    }

}
