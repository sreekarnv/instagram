import {MigrationInterface, QueryRunner} from "typeorm";

export class postModelPhoto1643272571025 implements MigrationInterface {
    name = 'postModelPhoto1643272571025'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" ADD "photo" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "photo"`);
    }

}
