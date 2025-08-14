import { categoryPostsService } from "@/services/categoryPostsService";
import { BreadcrumbCategories } from "../../_components/BreadcrumbCategories";
import { CategoryPostsDataTable } from "../_components/CategoryPostsDataTable";

export default async function Categories() {
  const categories = await categoryPostsService.getAll();

  return (
    <div>
      <BreadcrumbCategories />

      <div className="flex flex-1 flex-col p-4 pt-0">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Lista de Categorias de Posts</h1>
          <p className="text-muted-foreground">Gerencie suas categorias dos posts aqui.</p>
        </div>

        <CategoryPostsDataTable
          categories={categories || []}
        />
      </div>
    </div>
  )
}