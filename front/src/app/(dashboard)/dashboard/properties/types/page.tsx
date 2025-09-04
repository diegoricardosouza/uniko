import { getTypesAction } from "@/app/actions/types/get-types";
import { BreadcrumbTypes } from "../../_components/BreadcrumbTypes";
import { TypesDataTable } from "./_components/TypesDataTable";

export default async function Categories() {
  const types = await getTypesAction();

  return (
    <div>
      <BreadcrumbTypes />

      <div className="flex flex-1 flex-col p-4 pt-0">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Lista de Tipos</h1>
          <p className="text-muted-foreground">Gerencie os tipos aqui.</p>
        </div>

        <TypesDataTable
          types={types || []}
        />
      </div>
    </div>
  )
}