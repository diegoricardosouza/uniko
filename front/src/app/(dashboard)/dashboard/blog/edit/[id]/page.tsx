import { categoryPostsService } from "@/services/categoryPostsService";
import { BreadcrumbEditBlog } from "../../../_components/BreadcrumbEditBlog";
import { FormEditPost } from "../../_components/FormEditPost";


export default async function NewBlog() {
  const categories = await categoryPostsService.getAll();

  return (
    <div>
      <BreadcrumbEditBlog />

      <div className="flex flex-1 flex-col p-4 pt-0">
        <FormEditPost categorias={categories} />
      </div>
    </div>
  )
}