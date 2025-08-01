import { categoryPostsService } from "@/services/categoryPostsService";
import { BreadcrumbCategories } from "../../_components/BreadcrumbCategories";
import { CategoryPostsDataTable } from "../_components/CategoryPostsDataTable";

export default async function Categories() {
  const categories = await categoryPostsService.getAll();

  return (
    <div>
      <BreadcrumbCategories />

      <div className="flex flex-1 flex-col p-4 pt-0">
        <CategoryPostsDataTable
          categories={categories || []}
        />
      </div>
    </div>
  )
}