import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Type } from "@/entities/Type"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { ChevronsUpDown } from "lucide-react"
import { useMemo } from "react"
import { DataTableRowAction } from "./DataTableRowAction"

export function useColumnsTypes(onDelete: (id: string) => void, onEdit: (id: string) => void): ColumnDef<Type>[] {
  const columns = useMemo<ColumnDef<Type>[]>(() => [
    {
      accessorKey: "name",
      size: 300,
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tipo
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
      accessorKey: "slug",
      size: 300,
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Slug
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-4 pl-3">
            <Badge variant="outline" className="!bg-neutral-300/40 border-neutral-300">
              {row.original.slug}
            </Badge>
          </div>
        );
      }
    },
    {
      accessorKey: "createdAt",
      enableHiding: false,
      size: 200,
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Data de Criação
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        return (
          <div className="pl-3">
            <p className="text-sm font-medium leading-none">
              {format(row.original.createdAt!, "dd/MM/yyyy")}
            </p>
          </div>
        );
      }
    },
    {
      id: "actions",
      enableHiding: false,
      size: 50,
      cell: ({ row }) => (
        <DataTableRowAction row={row} onEdit={onEdit} onDelete={onDelete} />
      ),
    },
  ], [onDelete, onEdit]);

  return columns;
}