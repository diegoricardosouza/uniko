/*
  Warnings:

  - You are about to drop the column `featured_image` on the `posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "posts" DROP COLUMN "featured_image";

-- CreateTable
CREATE TABLE "medias" (
    "id" UUID NOT NULL,
    "filename" TEXT NOT NULL,
    "original_name" TEXT NOT NULL,
    "mime_type" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "thumbnail_url" TEXT,
    "alt" TEXT,
    "title" TEXT,
    "description" TEXT,
    "entity_type" TEXT NOT NULL,
    "entity_id" UUID NOT NULL,
    "media_type" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "medias_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "medias_entity_type_entity_id_idx" ON "medias"("entity_type", "entity_id");

-- CreateIndex
CREATE INDEX "medias_entity_type_entity_id_media_type_idx" ON "medias"("entity_type", "entity_id", "media_type");

-- CreateIndex
CREATE INDEX "medias_entity_type_entity_id_order_idx" ON "medias"("entity_type", "entity_id", "order");

-- AddForeignKey
ALTER TABLE "medias" ADD CONSTRAINT "medias_entity_id_fkey" FOREIGN KEY ("entity_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
