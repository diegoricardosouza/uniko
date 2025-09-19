import { getPropertiesAction } from "@/app/actions/properties/get-properties";
import { BreadcrumbProperties } from "../_components/BreadcrumbProperties";
import { PropertiesDataTable } from "./_components/PropertiesDataTable";

export default async function Properties() {
  const properties = await getPropertiesAction();

  return (
    <div>
      <BreadcrumbProperties />

      <div className="flex flex-1 flex-col p-4 pt-0">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Lista de Imóveis</h1>
          <p className="text-muted-foreground">Gerencie seus imóveis aqui.</p>
        </div>

        <PropertiesDataTable
          properties={properties || []}
        />
      </div>
    </div>
  )
}