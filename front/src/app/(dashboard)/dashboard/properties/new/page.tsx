import { BreadcrumbNewProperty } from "../../_components/BreadcrumbNewProperty";
import { FormNewProperty } from "../_components/FormNewProperty";

export default async function NewProperty() {
  return (
    <div>
      <BreadcrumbNewProperty />

      <div className="flex flex-1 flex-col p-4 pt-0">
        <FormNewProperty />
      </div>
    </div>
  )
}