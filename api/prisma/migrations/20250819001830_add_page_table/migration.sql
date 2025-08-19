-- DropIndex
DROP INDEX "medias_entity_type_entity_id_media_type_idx";

-- CreateTable
CREATE TABLE "pages" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "content" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pages_slug_key" ON "pages"("slug");

-- RenameForeignKey
ALTER TABLE "medias" RENAME CONSTRAINT "medias_entity_id_fkey" TO "media_post_fkey";

-- AddForeignKey
ALTER TABLE "medias" ADD CONSTRAINT "media_page_fkey" FOREIGN KEY ("entity_id") REFERENCES "pages"("id") ON DELETE CASCADE ON UPDATE CASCADE;
