-- CreateTable
CREATE TABLE "category_posts" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "category_posts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "category_posts_name_key" ON "category_posts"("name");

-- CreateIndex
CREATE UNIQUE INDEX "category_posts_slug_key" ON "category_posts"("slug");
