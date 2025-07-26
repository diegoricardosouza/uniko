import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { User } from "@/entities/User"
import { ColumnDef } from "@tanstack/react-table"
import { ChevronsUpDown, Edit, Trash2, UserCog } from "lucide-react"
import Link from "next/link"
import { useMemo } from "react"

export function useColumnsUser(onDelete: (id: string) => void): ColumnDef<User>[] {
  const columns = useMemo<ColumnDef<User>[]>(() => [
    {
      accessorKey: "name",
      size: 400,
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-4">
            <div className="grid gap-1">
              <p className="text-sm font-medium leading-none">
                {row.original.name}
              </p>
            </div>
          </div>
        );
      }
    },
    {
      accessorKey: "email",
      size: 400,
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          E-mail
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-4 pl-4">
            <div className="grid gap-1">
              <p className="text-sm font-medium leading-none">
                {row.original.email}
              </p>
            </div>
          </div>
        );
      }
    },
    {
      accessorKey: "role",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nível
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        return (
          <div className="pl-4">
            <Badge className="pb-1"><UserCog /> {row.original.role === 'ADMIN' ? 'Administrador' : 'Editor'}</Badge>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
    },
    {
      id: "actions",
      enableHiding: false,
      size: 100,
      cell: ({ row }) => (
        <div className="flex items-center gap-0">
          <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
            <Link href={`/usuarios/edit/${row.original.id}`}>
              <Edit className="w-4 h-4 text-blue-700" />
              <span className="sr-only">Editar</span>
            </Link>
          </Button>
          <AlertDialog>
            <AlertDialogTrigger>
              <Button
                className="bg-transparent text-[#020817] cursor-pointer h-8 w-8"
                variant="ghost"
                asChild
                size="icon"
              >
                <a>
                  <Trash2 className="w-4 h-4 text-red-800" />
                </a>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Deseja realmente excluir?</AlertDialogTitle>
                <AlertDialogDescription>
                  Essa ação não pode ser desfeita. Os dados serão removidos permanentemente.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="cursor-pointer">Cancelar</AlertDialogCancel>
                <AlertDialogAction className="cursor-pointer" onClick={() => onDelete(row.original.id)}>
                  Confirmar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ),
    },
  ], [onDelete]);

  return columns;
}