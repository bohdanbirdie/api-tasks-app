import {MigrationInterface, QueryRunner} from "typeorm";

export class tasksStatus1585661897712 implements MigrationInterface {
    name = 'tasksStatus1585661897712'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "task)status_history_status_enum" AS ENUM('0', '1', '2', '3')`, undefined);
        await queryRunner.query(`CREATE TABLE "task)status_history" ("id" SERIAL NOT NULL, "taskId" integer NOT NULL, "userId" integer NOT NULL, "status" "task)status_history_status_enum" NOT NULL DEFAULT '0', CONSTRAINT "PK_a0075da92aae4029e323d35580a" PRIMARY KEY ("id", "taskId", "userId"))`, undefined);
        await queryRunner.query(`ALTER TABLE "task)status_history" ADD CONSTRAINT "FK_fe7dcd509a6e30eb696355c0aec" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "task)status_history" ADD CONSTRAINT "FK_ec7eb86355b611167d8cc807e6f" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task)status_history" DROP CONSTRAINT "FK_ec7eb86355b611167d8cc807e6f"`, undefined);
        await queryRunner.query(`ALTER TABLE "task)status_history" DROP CONSTRAINT "FK_fe7dcd509a6e30eb696355c0aec"`, undefined);
        await queryRunner.query(`DROP TABLE "task)status_history"`, undefined);
        await queryRunner.query(`DROP TYPE "task)status_history_status_enum"`, undefined);
    }

}
