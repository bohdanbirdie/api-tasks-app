import {MigrationInterface, QueryRunner} from "typeorm";

export class tasksStatus1585675507707 implements MigrationInterface {
    name = 'tasksStatus1585675507707'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "task_status_history_status_enum" AS ENUM('0', '1', '2', '3')`, undefined);
        await queryRunner.query(`CREATE TABLE "task_status_history" ("id" SERIAL NOT NULL, "taskId" integer NOT NULL, "userId" integer NOT NULL, "status" "task_status_history_status_enum" NOT NULL DEFAULT '0', CONSTRAINT "PK_e1bb9bb9fc555c1d50377e3540f" PRIMARY KEY ("id", "taskId", "userId"))`, undefined);
        await queryRunner.query(`ALTER TABLE "task_status_history" ADD CONSTRAINT "FK_91a4aa8b2eee9800cb44cfefcaf" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "task_status_history" ADD CONSTRAINT "FK_51198f2d2ac614940d606cc4b9e" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task_status_history" DROP CONSTRAINT "FK_51198f2d2ac614940d606cc4b9e"`, undefined);
        await queryRunner.query(`ALTER TABLE "task_status_history" DROP CONSTRAINT "FK_91a4aa8b2eee9800cb44cfefcaf"`, undefined);
        await queryRunner.query(`DROP TABLE "task_status_history"`, undefined);
        await queryRunner.query(`DROP TYPE "task_status_history_status_enum"`, undefined);
    }

}
