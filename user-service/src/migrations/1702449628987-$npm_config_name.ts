import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1702449628987 implements MigrationInterface {
    name = ' $npmConfigName1702449628987'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "isActive" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isActive"`);
    }

}
