import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAdmin1747832202309 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
                INSERT INTO users (username, password) VALUES ('admin', 'admin1');
            `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM users WHERE username = 'admin';
        `);
    }

}
