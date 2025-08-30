import { getEmailsAction } from "@/app/actions/emails/get-emails";
import { BreadcrumbEmails } from "../_components/BreadcrumbEmails";
import { ProtectedRoute } from "../_components/ProtectedRoute";
import { EmailsDataTable } from "./_components/EmailsDataTable";

export default async function Emails() {
  const emails = await getEmailsAction();

  return (
    <ProtectedRoute requiredRoles={["ADMIN"]}>
      <BreadcrumbEmails />
      
      <div className="flex flex-1 flex-col p-4 pt-0">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Lista de Emails</h1>
          <p className="text-muted-foreground">Gerencie os e-mails aqui.</p>
        </div>

        <EmailsDataTable
          emails={emails || []}
        />
      </div>
    </ProtectedRoute>
  )
}