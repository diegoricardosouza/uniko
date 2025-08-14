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
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Lista de Usuários</h1>
          <p className="text-muted-foreground">Gerencie seus usuários e suas funções aqui.</p>
        </div>

        <UsersDataTable
          users={users || []}
          user={session!.user}
        />
      </div>
    </ProtectedRoute>
  )
}