/* eslint-disable @next/next/no-img-element */
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FinalitiesProps, Property, TypesProps } from "@/entities/Property"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { ChevronsUpDown } from "lucide-react"
import { useMemo } from "react"
import { DataTableRowAction } from "./DataTableRowAction"

export function useColumnsProperties(onDelete: (id: string) => void): ColumnDef<Property>[] {
  const columns = useMemo<ColumnDef<Property>[]>(() => [
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
        const featuredImage = row.original.medias?.filter(media => media.mediaType === 'featured_image') ?? []

        return (
          <div className="flex items-center gap-4 pl-3">
            <div className="grid gap-1">
              <p className="text-sm font-medium leading-none">
                {featuredImage.length > 0 && (
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_URL}${featuredImage[0]?.url ?? ""}`}
                    className="w-[100px] h-[100px] object-cover"
                    alt={featuredImage[0]?.originalName ?? "Imagem do imóvel"}
                  />
                )}
              </p>
            </div>
          </div>
        );
      }
    },
    {
      accessorKey: "title",
      size: 200,
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Imóvel
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        return (
          <div className="pl-3">
            <p className="text-sm font-medium leading-none">
              {row.original.title}
              <span className="text-[#b1b1b1] font-normal block mt-1">Ref.: {row.original.reference}</span>
            </p>
          </div>
        );
      }
    },
    {
      accessorKey: "finalities",
      size: 150,
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Finalidade
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        return (
          <div className="pl-3 flex gap-2 flex-wrap">
            {row.original.finalities?.map((category, index) => (
              <Badge key={index} variant="outline" className="!bg-neutral-300/40 border-neutral-300">
                {category.name}
              </Badge>
            ))}
          </div>
        );
      },
      filterFn: (row, id, filterValues: string[]) => {
        const finalities: FinalitiesProps[] = row.getValue(id);
        const slugs = finalities.map(cat => cat.slug);
        return filterValues.some(value => slugs.includes(value));
      },
    },
    {
      accessorKey: "types",
      size: 150,
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tipos
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        return (
          <div className="pl-3 flex gap-2 flex-wrap">
            {row.original.types?.map((category, index) => (
              <Badge key={index} variant="outline" className="!bg-neutral-300/40 border-neutral-300">
                {category.name}
              </Badge>
            ))}
          </div>
        );
      },
      filterFn: (row, id, filterValues: string[]) => {
        const categories: TypesProps[] = row.getValue(id);
        const slugs = categories.map(cat => cat.slug);
        return filterValues.some(value => slugs.includes(value));
      },
    },
    {
      accessorKey: "city",
      size: 100,
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cidade/UF
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        return (
          <div className="pl-3">
            <p className="text-sm font-medium leading-none">
              <Badge variant="outline" className="bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200">
                {row.original.city?.name}/{row.original.city?.state.acronym}
              </Badge>
            </p>
          </div>
        );
      }
    },
    {
      accessorKey: "neighborhood",
      size: 100,
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
          <div className="pl-3">
            <p className="text-sm font-medium leading-none">
              <Badge variant="outline" className="bg-sky-200/40 text-sky-900 dark:text-sky-100 border-sky-300">
                {row.original.neighborhood?.name}
              </Badge>
            </p>
          </div>
        );
      }
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