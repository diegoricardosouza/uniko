import { BreadcrumbEditProperty } from "../../../_components/BreadcrumbEditProperty";
import { FormEditProperty } from "../../_components/FormEditProperty";


export default async function EditProperty() {
  return (
    <div>
      <BreadcrumbEditProperty />

      <div className="flex flex-1 flex-col p-4 pt-0">
        <FormEditProperty />
      </div>
    </div>
  )
}