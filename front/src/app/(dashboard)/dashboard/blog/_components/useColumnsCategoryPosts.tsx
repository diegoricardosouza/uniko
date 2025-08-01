import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CategoryPosts } from "@/entities/CategoryPosts"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { ChevronsUpDown, Edit, Trash2 } from "lucide-react"
import { useMemo } from "react"

export function useColumnsCategoryPosts(onDelete: (id: string) => void, onEdit: (id: string) => void): ColumnDef<CategoryPosts>[] {
  const columns = useMemo<ColumnDef<CategoryPosts>[]>(() => [
    {
      accessorKey: "name",
      size: 150,
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
          <div className="flex items-center gap-4 pl-4">
            <Badge variant="secondary" className="font-mono">
              {row.original.slug}
            </Badge>
          </div>
        );
      }
    },
    {
      accessorKey: "description",
      size: 300,
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Descrição
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        return (
          <div className="pl-4 truncate">
            {row.original.description}
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
          <div className="pl-4">
            {format(row.original.createdAt!, "dd/MM/yyyy")}
          </div>
        );
      }
    },
    {
      id: "actions",
      enableHiding: false,
      size: 100,
      cell: ({ row }) => (
        <div className="flex items-center gap-0">
          <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer" onClick={() => onEdit(row.original.id)}>
            <Edit className="w-4 h-4 text-blue-700" />
            <span className="sr-only">Editar</span>
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
  ], [onDelete, onEdit]);

  return columns;
}