import {MigrationInterface, QueryRunner} from "typeorm";

export class likesModelInit1643405667450 implements MigrationInterface {
    name = 'likesModelInit1643405667450'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "likes" ("id" character varying NOT NULL, "userId" character varying NOT NULL, "postId" character varying NOT NULL, CONSTRAINT "PK_a9323de3f8bced7539a794b4a37" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "likes"`);
    }

}
