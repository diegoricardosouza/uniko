import { getCitiesAction } from "@/app/actions/cities/get-cities";
import { BreadcrumbCities } from "../../_components/BreadcrumbCities";
import { CitiesDataTable } from "./_components/CitiesDataTable";

export default async function Categories() {
  const cities = await getCitiesAction();

  return (
    <div>
      <BreadcrumbCities />

      <div className="flex flex-1 flex-col p-4 pt-0">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Lista de Cidades</h1>
          <p className="text-muted-foreground">Gerencie os suas cidades aqui.</p>
        </div>

        <CitiesDataTable
          cities={cities || []}
        />
      </div>
    </div>
  )
}