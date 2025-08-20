import { BreadcrumbNewBlog } from "../../_components/BreadcrumbNewBlog";
import { FormNewPage } from "../_components/FormNewPage";

export default async function NewPage() {
  return (
    <div>
      <BreadcrumbNewBlog />

      <div className="flex flex-1 flex-col p-4 pt-0">
        <FormNewPage />
      </div>
    </div>
  )
}