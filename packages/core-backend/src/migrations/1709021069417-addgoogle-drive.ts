import { MigrationInterface, QueryRunner } from "typeorm";

export class AddgoogleDrive1709021069417 implements MigrationInterface {
    name = 'AddgoogleDrive1709021069417'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."o_auth_app_name_enum" RENAME TO "o_auth_app_name_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."o_auth_app_name_enum" AS ENUM('github', 'google-drive', 'confluence')`);
        await queryRunner.query(`ALTER TABLE "o_auth" ALTER COLUMN "app_name" TYPE "public"."o_auth_app_name_enum" USING "app_name"::"text"::"public"."o_auth_app_name_enum"`);
        await queryRunner.query(`DROP TYPE "public"."o_auth_app_name_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."app_name_enum" RENAME TO "app_name_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."app_name_enum" AS ENUM('github', 'google-drive', 'confluence')`);
        await queryRunner.query(`ALTER TABLE "app" ALTER COLUMN "name" TYPE "public"."app_name_enum" USING "name"::"text"::"public"."app_name_enum"`);
        await queryRunner.query(`DROP TYPE "public"."app_name_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."app_category_enum" RENAME TO "app_category_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."app_category_enum" AS ENUM('Software Development', 'File Storage')`);
        await queryRunner.query(`ALTER TABLE "app" ALTER COLUMN "category" TYPE "public"."app_category_enum" USING "category"::"text"::"public"."app_category_enum"`);
        await queryRunner.query(`DROP TYPE "public"."app_category_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."app_category_enum_old" AS ENUM('Software Development')`);
        await queryRunner.query(`ALTER TABLE "app" ALTER COLUMN "category" TYPE "public"."app_category_enum_old" USING "category"::"text"::"public"."app_category_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."app_category_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."app_category_enum_old" RENAME TO "app_category_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."app_name_enum_old" AS ENUM('github')`);
        await queryRunner.query(`ALTER TABLE "app" ALTER COLUMN "name" TYPE "public"."app_name_enum_old" USING "name"::"text"::"public"."app_name_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."app_name_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."app_name_enum_old" RENAME TO "app_name_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."o_auth_app_name_enum_old" AS ENUM('github')`);
        await queryRunner.query(`ALTER TABLE "o_auth" ALTER COLUMN "app_name" TYPE "public"."o_auth_app_name_enum_old" USING "app_name"::"text"::"public"."o_auth_app_name_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."o_auth_app_name_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."o_auth_app_name_enum_old" RENAME TO "o_auth_app_name_enum"`);
    }

}