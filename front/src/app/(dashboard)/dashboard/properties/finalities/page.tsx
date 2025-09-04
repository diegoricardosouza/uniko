import { getFinalitiesAction } from "@/app/actions/finalities/get-finalities";
import { BreadcrumbFinalities } from "../../_components/BreadcrumbFinalities";
import { FinalitiesDataTable } from "./_components/FinalitiesDataTable";

export default async function Categories() {
  const finalities = await getFinalitiesAction();

  return (
    <div>
      <BreadcrumbFinalities />

      <div className="flex flex-1 flex-col p-4 pt-0">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Lista de Finalidades</h1>
          <p className="text-muted-foreground">Gerencie as finalidades aqui.</p>
        </div>

        <FinalitiesDataTable
          finalities={finalities || []}
        />
      </div>
    </div>
  )
}