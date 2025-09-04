/* eslint-disable @typescript-eslint/no-explicit-any */
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Edit, Ellipsis, Trash2 } from "lucide-react";
import { useState } from "react";

export function DataTableRowAction({ row, onEdit, onDelete }: {
  row: any;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}) {

  const [open, setOpen] = useState(false);

  function handleDialogOpen() {
    setOpen(true);
  }

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deseja realmente excluir?</AlertDialogTitle>
            <AlertDialogDescription>
              Essa ação não pode ser desfeita. Os dados serão removidos permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="cursor-pointer"
              onClick={() => onDelete(row.original.id)}
            >
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='data-[state=open]:bg-muted flex h-8 w-8 p-0'
          >
            <Ellipsis className='h-4 w-4' />
            <span className='sr-only'>Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-[160px]'>
          <DropdownMenuItem
            onClick={() => onEdit(row.original.id)}
            className="cursor-pointer"
          >
            Editar
            <DropdownMenuShortcut>
              <Edit className="w-4 h-4" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleDialogOpen}
            className='text-red-500 cursor-pointer'
          >
            Deletar
            <DropdownMenuShortcut>
              <Trash2 className="w-4 h-4" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}