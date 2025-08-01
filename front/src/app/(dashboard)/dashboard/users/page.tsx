import { auth } from "@/lib/auth";
import { usersService } from "@/services/usersService";
import { BreadcrumbUsers } from "../_components/BreadcrumbUsers";
import { ProtectedRoute } from "../_components/ProtectedRoute";
import { UsersDataTable } from "./_components/UsersDataTable";

export default async function Users() {
  const users = await usersService.getAll();
  const session = await auth();

  return (
    <ProtectedRoute requiredRoles={["ADMIN"]}>
      <BreadcrumbUsers />

      <div className="flex flex-1 flex-col p-4 pt-0">
        <UsersDataTable
          users={users || []}
          user={session!.user}
        />
      </div>
    </ProtectedRoute>
  )
}