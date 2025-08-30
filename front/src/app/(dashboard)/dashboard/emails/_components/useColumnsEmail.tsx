import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Email } from "@/entities/Email"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { ChevronsUpDown } from "lucide-react"
import { useMemo } from "react"
import { DataTableRowAction } from "./DataTableRowAction"

export function useColumnsEmail(onDelete: (id: string) => void, onSee: (id: string) => void): ColumnDef<Email>[] {
  const columns = useMemo<ColumnDef<Email>[]>(() => [
    {
      accessorKey: "name",
      size: 400,
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome Formulário
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
      accessorKey: "status",
      size: 400,
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
            {row.original.status === 'SENT' && (
              <Badge variant="outline" className="bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200">
                Enviado
              </Badge>
            )}
            {row.original.status === 'FAILED' && (
              <Badge variant="outline" className="bg-destructive/10 dark:bg-destructive/50 text-destructive dark:text-primary border-destructive/10">
                Falha
              </Badge>
            )}
            {row.original.status === 'PENDING' && (
              <Badge variant="outline" className="bg-yellow-50 text-yellow-500 border-yellow-500">
                Pendente
              </Badge>
            )}
          </div>
        );
      }
    },
    {
      accessorKey: "createdAt",
      size: 400,
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Enviado em
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        return (
          <div className="pl-3">
            <p className="text-sm font-medium leading-none">
              {format(row.original.createdAt!, 'dd/MM/yyyy k:mm:ss')}
            </p>
          </div>
        );
      }
    },
    {
      id: "actions",
      enableHiding: false,
      size: 100,
      cell: ({ row }) => (
        <DataTableRowAction row={row} onSee={onSee} onDelete={onDelete} />
      ),
    },
  ], [onDelete, onSee]);

  return columns;
}