import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1585431750246 implements MigrationInterface {
    name = 'initial1585431750246'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_b455b2f078b9a28bda8e7b3696a"`, undefined);
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "authorId"`, undefined);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "authorId" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_b455b2f078b9a28bda8e7b3696a" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_b455b2f078b9a28bda8e7b3696a"`, undefined);
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "authorId"`, undefined);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "authorId" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_b455b2f078b9a28bda8e7b3696a" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

}
