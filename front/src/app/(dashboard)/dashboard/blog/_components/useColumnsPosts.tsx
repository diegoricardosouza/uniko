/* eslint-disable @next/next/no-img-element */
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CategoryPostsCat, Post } from "@/entities/Post"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { ChevronsUpDown, Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import { useMemo } from "react"

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
          <div className="flex items-center gap-4 pl-4">
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
          <div className="pl-4">
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
          <div className="pl-4 flex gap-2 flex-wrap">
            {row.original.categories?.map((category, index) => (
              <Badge key={index} variant="secondary" className="font-bold">
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
          <div className="pl-4">
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
        <div className="flex items-center gap-0">
          <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
            <Link href={`/dashboard/users/edit/${row.original.id}`}>
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