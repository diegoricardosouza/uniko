import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { User } from "@/entities/User"
import { ColumnDef } from "@tanstack/react-table"
import { ChevronsUpDown, Shield, UserPen } from "lucide-react"
import { useMemo } from "react"
import { DataTableRowAction } from "./DataTableRowAction"

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
          <div className="flex items-center gap-4 pl-3">
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
          <div className="flex items-center gap-4 pl-3">
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
          <div className="pl-3">
            {row.original.role === 'ADMIN' && (
              <div className="flex items-center gap-x-2">
                <Shield className='w-4 h-4 text-muted-foreground' /> 
                <span className='text-sm capitalize'>Administrador</span>
              </div>
            )}
            {row.original.role === 'EDITOR' && (
              <div className="flex items-center gap-x-2">
                <UserPen className='w-4 h-4 text-muted-foreground' />
                <span className='text-sm capitalize'>Editor</span>
              </div>
            )}
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
    },
    {
      accessorKey: "active",
      enableHiding: false,
      size: 100,
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        return (
          <div className="pl-3">
            {row.original.active ? (
              <Badge variant="outline" className="bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200">
                Ativo
              </Badge>
            ) : (
              <Badge variant="outline" className="bg-destructive/10 dark:bg-destructive/50 text-destructive dark:text-primary border-destructive/10">
                Inativo
              </Badge>
            )}
            
          </div>
        );
      }
    },
    {
      id: "actions",
      enableHiding: false,
      size: 100,
      cell: ({ row }) => (
        <DataTableRowAction row={row} onDelete={onDelete} />
      ),
    },
  ], [onDelete]);

  return columns;
}