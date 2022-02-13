import {MigrationInterface, QueryRunner} from "typeorm";

export class userModelRegistered1643193553154 implements MigrationInterface {
    name = 'userModelRegistered1643193553154'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "hasRegistered" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "hasRegistered"`);
    }

}
