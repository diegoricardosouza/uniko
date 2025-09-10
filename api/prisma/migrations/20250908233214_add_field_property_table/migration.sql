/*
  Warnings:

  - You are about to drop the `_PropertyToPropertyCharacteristics` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PropertyToPropertyCondominiumInfrastructure` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `property_id` to the `property_characteristics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `property_id` to the `property_condominium_infrastructures` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_PropertyToPropertyCharacteristics" DROP CONSTRAINT "_PropertyToPropertyCharacteristics_A_fkey";

-- DropForeignKey
ALTER TABLE "_PropertyToPropertyCharacteristics" DROP CONSTRAINT "_PropertyToPropertyCharacteristics_B_fkey";

-- DropForeignKey
ALTER TABLE "_PropertyToPropertyCondominiumInfrastructure" DROP CONSTRAINT "_PropertyToPropertyCondominiumInfrastructure_A_fkey";

-- DropForeignKey
ALTER TABLE "_PropertyToPropertyCondominiumInfrastructure" DROP CONSTRAINT "_PropertyToPropertyCondominiumInfrastructure_B_fkey";

-- AlterTable
ALTER TABLE "property_characteristics" ADD COLUMN     "property_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "property_condominium_infrastructures" ADD COLUMN     "property_id" UUID NOT NULL;

-- DropTable
DROP TABLE "_PropertyToPropertyCharacteristics";

-- DropTable
DROP TABLE "_PropertyToPropertyCondominiumInfrastructure";

-- AddForeignKey
ALTER TABLE "property_characteristics" ADD CONSTRAINT "property_characteristics_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property_condominium_infrastructures" ADD CONSTRAINT "property_condominium_infrastructures_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;
