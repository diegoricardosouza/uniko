import { getStatesAction } from "@/app/actions/states/get-states";
import { BreadcrumbStates } from "../../_components/BreadcrumbStates";
import { StatesDataTable } from "./_components/StatesDataTable";

export default async function Categories() {
  const states = await getStatesAction();

  return (
    <div>
      <BreadcrumbStates />

      <div className="flex flex-1 flex-col p-4 pt-0">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Lista de Estados</h1>
          <p className="text-muted-foreground">Gerencie os estados aqui.</p>
        </div>

        <StatesDataTable
          states={states || []}
        />
      </div>
    </div>
  )
}