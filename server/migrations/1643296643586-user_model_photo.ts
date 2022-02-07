import {MigrationInterface, QueryRunner} from "typeorm";

export class userModelPhoto1643296643586 implements MigrationInterface {
    name = 'userModelPhoto1643296643586'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "photo" character varying NOT NULL DEFAULT '/uploads/avatars/avatar-1.png'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "photo"`);
    }

}
