import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1732804382270 implements MigrationInterface {
    name = 'SchemaUpdate1732804382270'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "distributor" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "socketId" character varying, "distributorId" character varying NOT NULL, "isAuthorized" boolean NOT NULL DEFAULT false, "isConnected" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_60873055a0c3cbc403574737f9e" UNIQUE ("socketId"), CONSTRAINT "UQ_8061b3f9e61c26a0186d16ec71a" UNIQUE ("distributorId"), CONSTRAINT "PK_949c7e62bf60d4e6488f6f29b8d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "food_schedule" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "distributorId" character varying NOT NULL, "cron" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_306fddcfe2a7bbcfb97229ca504" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "food_serving" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "distributorId" character varying NOT NULL, "dateTime" TIMESTAMP NOT NULL, "isConfirmed" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_ea39d1b0b0380e35ff43439bf33" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "food_serving"`);
        await queryRunner.query(`DROP TABLE "food_schedule"`);
        await queryRunner.query(`DROP TABLE "distributor"`);
    }

}
