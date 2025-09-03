import { getNeighborhoodsAction } from "@/app/actions/neighborhoods/get-neighborhoods";
import { BreadcrumbCities } from "../../_components/BreadcrumbCities";
import { NeighborhoodsDataTable } from "./_components/NeighborhoodsDataTable";

export default async function Categories() {
  const neighborhoods = await getNeighborhoodsAction();

  return (
    <div>
      <BreadcrumbCities />

      <div className="flex flex-1 flex-col p-4 pt-0">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Lista de Bairros</h1>
          <p className="text-muted-foreground">Gerencie os seus bairros aqui.</p>
        </div>

        <NeighborhoodsDataTable
          neighborhoods={neighborhoods || []}
        />
      </div>
    </div>
  )
}