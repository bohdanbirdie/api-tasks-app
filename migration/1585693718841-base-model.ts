import {MigrationInterface, QueryRunner} from "typeorm";

export class baseModel1585693718841 implements MigrationInterface {
    name = 'baseModel1585693718841'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "task_status_history" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "task_status_history" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "task_sharing" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "task_sharing" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task_sharing" DROP COLUMN "updatedAt"`, undefined);
        await queryRunner.query(`ALTER TABLE "task_sharing" DROP COLUMN "createdAt"`, undefined);
        await queryRunner.query(`ALTER TABLE "task_status_history" DROP COLUMN "updatedAt"`, undefined);
        await queryRunner.query(`ALTER TABLE "task_status_history" DROP COLUMN "createdAt"`, undefined);
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "updatedAt"`, undefined);
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "createdAt"`, undefined);
    }

}
