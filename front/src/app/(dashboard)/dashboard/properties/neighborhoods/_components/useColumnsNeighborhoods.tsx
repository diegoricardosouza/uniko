import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Neighborhood } from "@/entities/Neighborhood"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { ChevronsUpDown } from "lucide-react"
import { useMemo } from "react"
import { DataTableRowAction } from "./DataTableRowAction"

export function useColumnsNeighborhoods(onDelete: (id: string) => void, onEdit: (id: string) => void): ColumnDef<Neighborhood>[] {
  const columns = useMemo<ColumnDef<Neighborhood>[]>(() => [
    {
      accessorKey: "name",
      size: 300,
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Bairro
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
      size: 150,
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
      accessorKey: "estado",
      size: 150,
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Estado
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-4 pl-3">
            <Badge variant="outline" className="bg-sky-200/40 text-sky-900 dark:text-sky-100 border-sky-300">
              {row.original.city?.state?.name}
            </Badge>
          </div>
        );
      }
    },
    {
      accessorKey: "cidade",
      size: 300,
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cidade
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-4 pl-3">
            <Badge variant="outline" className="bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200">
              {row.original.city?.name}
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