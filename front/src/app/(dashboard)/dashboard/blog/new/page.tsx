import { categoryPostsService } from "@/services/categoryPostsService";
import { BreadcrumbNewBlog } from "../../_components/BreadcrumbNewBlog";
import { FormNewPost } from "./_components/FormNewPost";

export default async function NewBlog() {
  const categories = await categoryPostsService.getAll();

  return (
    <div>
      <BreadcrumbNewBlog />

      <div className="flex flex-1 flex-col p-4 pt-0">
        <FormNewPost categorias={categories} />
      </div>
    </div>
  )
}