-- CreateTable
CREATE TABLE "properties" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "slug" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "price_condominium" DOUBLE PRECISION,
    "price_iptu" DOUBLE PRECISION,
    "delivery" TEXT,
    "total_area" DOUBLE PRECISION,
    "private_area" DOUBLE PRECISION,
    "bedrooms" INTEGER,
    "bathrooms" INTEGER,
    "parking_spaces" INTEGER,
    "address" TEXT,
    "number" TEXT,
    "complement" TEXT,
    "zip_code" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "city_id" UUID,
    "neighborhood_id" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "properties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "property_characteristics" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "property_characteristics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "property_condominium_infrastructures" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "property_condominium_infrastructures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "property_types" (
    "id" UUID NOT NULL,
    "property_id" UUID NOT NULL,
    "type_id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "property_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "property_finalities" (
    "id" UUID NOT NULL,
    "property_id" UUID NOT NULL,
    "finality_id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "property_finalities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PropertyToPropertyCharacteristics" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_PropertyToPropertyCharacteristics_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_PropertyToPropertyCondominiumInfrastructure" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_PropertyToPropertyCondominiumInfrastructure_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "properties_slug_key" ON "properties"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "property_types_property_id_type_id_key" ON "property_types"("property_id", "type_id");

-- CreateIndex
CREATE UNIQUE INDEX "property_finalities_property_id_finality_id_key" ON "property_finalities"("property_id", "finality_id");

-- CreateIndex
CREATE INDEX "_PropertyToPropertyCharacteristics_B_index" ON "_PropertyToPropertyCharacteristics"("B");

-- CreateIndex
CREATE INDEX "_PropertyToPropertyCondominiumInfrastructure_B_index" ON "_PropertyToPropertyCondominiumInfrastructure"("B");

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_neighborhood_id_fkey" FOREIGN KEY ("neighborhood_id") REFERENCES "neighborhoods"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property_types" ADD CONSTRAINT "property_types_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property_types" ADD CONSTRAINT "property_types_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property_finalities" ADD CONSTRAINT "property_finalities_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property_finalities" ADD CONSTRAINT "property_finalities_finality_id_fkey" FOREIGN KEY ("finality_id") REFERENCES "finalities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PropertyToPropertyCharacteristics" ADD CONSTRAINT "_PropertyToPropertyCharacteristics_A_fkey" FOREIGN KEY ("A") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PropertyToPropertyCharacteristics" ADD CONSTRAINT "_PropertyToPropertyCharacteristics_B_fkey" FOREIGN KEY ("B") REFERENCES "property_characteristics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PropertyToPropertyCondominiumInfrastructure" ADD CONSTRAINT "_PropertyToPropertyCondominiumInfrastructure_A_fkey" FOREIGN KEY ("A") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PropertyToPropertyCondominiumInfrastructure" ADD CONSTRAINT "_PropertyToPropertyCondominiumInfrastructure_B_fkey" FOREIGN KEY ("B") REFERENCES "property_condominium_infrastructures"("id") ON DELETE CASCADE ON UPDATE CASCADE;
