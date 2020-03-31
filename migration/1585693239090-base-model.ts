import {MigrationInterface, QueryRunner} from "typeorm";

export class baseModel1585693239090 implements MigrationInterface {
    name = 'baseModel1585693239090'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updatedAt"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "createdAt"`, undefined);
    }

}
