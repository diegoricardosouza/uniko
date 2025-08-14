/* eslint-disable @next/next/no-img-element */
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CategoryPostsCat, Post } from "@/entities/Post"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { ChevronsUpDown } from "lucide-react"
import { useMemo } from "react"
import { DataTableRowAction } from "./DataTableRowAction"

export function useColumnsPosts(onDelete: (id: string) => void): ColumnDef<Post>[] {
  const columns = useMemo<ColumnDef<Post>[]>(() => [
    {
      accessorKey: "featuredImage",
      size: 80,
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Imagem
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-4 pl-3">
            <div className="grid gap-1">
              <p className="text-sm font-medium leading-none">
                {row.original.medias?.map((media) => (
                  <img
                    key={media.id}
                    src={`${process.env.NEXT_PUBLIC_API_URL}${media.url}`}
                    className="w-[100px] h-[100px] object-cover"
                    alt={media.originalName}
                  />
                ))}
              </p>
            </div>
          </div>
        );
      }
    },
    {
      accessorKey: "name",
      size: 300,
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
          <div className="pl-3">
            <p className="text-sm font-medium leading-none">
              {row.original.name}
            </p>
          </div>
        );
      }
    },
    {
      accessorKey: "categories",
      size: 150,
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Categorias
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        return (
          <div className="pl-3 flex gap-2 flex-wrap">
            {row.original.categories?.map((category, index) => (
              <Badge key={index} variant="outline" className="!bg-neutral-300/40 border-neutral-300">
                {category.name}
              </Badge>
            ))}
          </div>
        );
      },
      filterFn: (row, id, filterValues: string[]) => {
        const categories: CategoryPostsCat[] = row.getValue(id);
        const slugs = categories.map(cat => cat.slug);
        return filterValues.some(value => slugs.includes(value));
      },
    },
    {
      accessorKey: "createdAt",
      size: 100,
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Data de Publicação
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        return (
          <div className="pl-3">
            <p className="text-sm font-medium leading-none">
              {format(row.original.createdAt!, 'dd/MM/yyyy')}
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
        <DataTableRowAction row={row} onDelete={onDelete} />
      ),
    },
  ], [onDelete]);

  return columns;
}