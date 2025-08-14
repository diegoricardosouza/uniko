-- CreateTable
CREATE TABLE "settings" (
    "id" UUID NOT NULL,
    "title_seo" TEXT,
    "description_seo" TEXT,

    CONSTRAINT "settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "unit_companies" (
    "id" UUID NOT NULL,
    "setting_id" UUID,
    "name" TEXT,
    "email" TEXT,
    "telephone" TEXT,
    "cellphone" TEXT,
    "service" TEXT,
    "address" TEXT,

    CONSTRAINT "unit_companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "social_medias" (
    "id" UUID NOT NULL,
    "setting_id" UUID,
    "name" TEXT,
    "url" TEXT,
    "icon" TEXT,

    CONSTRAINT "social_medias_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "unit_companies" ADD CONSTRAINT "unit_companies_setting_id_fkey" FOREIGN KEY ("setting_id") REFERENCES "settings"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "social_medias" ADD CONSTRAINT "social_medias_setting_id_fkey" FOREIGN KEY ("setting_id") REFERENCES "settings"("id") ON DELETE SET NULL ON UPDATE CASCADE;
