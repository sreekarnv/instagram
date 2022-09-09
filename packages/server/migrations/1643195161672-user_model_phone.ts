import {MigrationInterface, QueryRunner} from "typeorm";

export class userModelPhone1643195161672 implements MigrationInterface {
    name = 'userModelPhone1643195161672'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "phone" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phone"`);
    }

}
