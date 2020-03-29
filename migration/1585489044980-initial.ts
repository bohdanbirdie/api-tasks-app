import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1585489044980 implements MigrationInterface {
    name = 'initial1585489044980'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tasks" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying, "authorId" integer, CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "task_sharing" ("id" SERIAL NOT NULL, "taskId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_cadb44dd390560c65f500eef76a" PRIMARY KEY ("id", "taskId", "userId"))`, undefined);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_b455b2f078b9a28bda8e7b3696a" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "task_sharing" ADD CONSTRAINT "FK_4fb26d841e6c3882bd99dbc1281" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "task_sharing" ADD CONSTRAINT "FK_0c2b43fd4d586f7935e576b752c" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task_sharing" DROP CONSTRAINT "FK_0c2b43fd4d586f7935e576b752c"`, undefined);
        await queryRunner.query(`ALTER TABLE "task_sharing" DROP CONSTRAINT "FK_4fb26d841e6c3882bd99dbc1281"`, undefined);
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_b455b2f078b9a28bda8e7b3696a"`, undefined);
        await queryRunner.query(`DROP TABLE "task_sharing"`, undefined);
        await queryRunner.query(`DROP TABLE "users"`, undefined);
        await queryRunner.query(`DROP TABLE "tasks"`, undefined);
    }

}
