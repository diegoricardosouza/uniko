import { BreadcrumbEditPage } from "../../../_components/BreadcrumbEditPage";
import { FormEditPage } from "../../_components/FormEditPage";


export default async function NewBlog() {
  return (
    <div>
      <BreadcrumbEditPage />

      <div className="flex flex-1 flex-col p-4 pt-0">
        <FormEditPage />
      </div>
    </div>
  )
}