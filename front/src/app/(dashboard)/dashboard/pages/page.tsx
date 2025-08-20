
import { getPagesAction } from "@/app/actions/pages/get-pages";
import { BreadcrumbPages } from "../_components/BreadcrumbPages";
import { PagesDataTable } from "./_components/PagesDataTable";

export default async function Posts() {
  const pages = await getPagesAction();

  return (
    <div>
      <BreadcrumbPages />

      <div className="flex flex-1 flex-col p-4 pt-0">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Lista de Páginas</h1>
          <p className="text-muted-foreground">Gerencie suas páginas aqui.</p>
        </div>

        <PagesDataTable
          pages={pages || []}
        />
      </div>
    </div>
  )
}