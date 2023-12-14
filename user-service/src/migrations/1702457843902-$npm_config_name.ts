import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1702457843902 implements MigrationInterface {
    name = ' $npmConfigName1702457843902'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isActive"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "isActive" boolean NOT NULL DEFAULT true`);
    }

}
