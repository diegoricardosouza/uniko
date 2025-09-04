 
'use client';

import { Spinner } from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Type as T } from "@/entities/Type";
import {
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Loader2, Plus, Type } from "lucide-react";
import { useState } from "react";
import { useTypesController } from "../useTypesController";
import { useColumnsTypes } from "./useColumnsTypes";


interface UsersDataTableProps {
  types: T[];
  isLoading?: boolean;
}

export function TypesDataTable({ types, isLoading }: UsersDataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [globalFilter, setGlobalFilter] = useState("")

  const { 
    form, 
    isDialogOpen, 
    editingCategory, 
    isLoading: isLoadingForm,
    setIsDialogOpen, 
    handleSubmit, 
    handleCloseDialog, 
    handleEdit, 
    handleNew,
    handleDelete
  } = useTypesController()

  const columnsUser = useColumnsTypes(handleDelete, handleEdit);

  const table = useReactTable({
    data: types,
    columns: columnsUser,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      globalFilter
    },
    onGlobalFilterChange: setGlobalFilter,
  })

  return (
    <>
      <div className="flex">
        <Button type="button" onClick={handleNew}>
          <Plus className="mr-1 h-4 w-4" />
          Novo Tipo
        </Button>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-md" onOpenAutoFocus={(e) => e.preventDefault()} onCloseAutoFocus={(e) => e.preventDefault()}>
            <DialogHeader>
              <DialogTitle>
                {editingCategory ? "Editar Tipo" : "Nova Tipo"}
              </DialogTitle>
              <DialogDescription>
                {editingCategory
                  ? "Atualize as informações da categoria"
                  : "Crie um novo tipo para seus imóveis"
                }
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={handleSubmit} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Type className="absolute left-3 top-[11px] h-4 w-4 text-gray-400" />
                          <Input placeholder="Digite o tipo" className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button variant="outline" onClick={handleCloseDialog} type="button" className="cursor-pointer">
                    Cancelar
                  </Button>
                  <Button onClick={handleSubmit} type="submit" className="cursor-pointer" disabled={isLoadingForm}>
                    {isLoadingForm && (<Loader2 className="mr-0 h-4 w-4 animate-spin" />)}
                    {editingCategory ? "Atualizar" : "Criar"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="w-full min-h-[300px] relative overflow-hidden">
        {isLoading && (
          <div className="w-full h-full flex justify-center items-center absolute top-0 left-0 bg-white z-50">
            <Spinner className="w-6 h-6 fill-primary" />
          </div>
        )}
        <div>
          <div className="flex items-center justify-between gap-2 py-4">
            <Input
              placeholder="Filtrar tipos..."
              value={globalFilter}
              onChange={(event) => setGlobalFilter(event.target.value)}
              className="max-w-sm"
            />

            <span className="text-sm">{types.length} itens</span>
          </div>
          <div className="rounded-md border">
            <Table className="table-fixed w-full">
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id} style={{ width: `${header.getSize()}px` }} className="truncate">
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} style={{ width: `${cell.column.getSize()}px` }} className="truncate">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columnsUser.length} className="h-24 text-center">
                      Nenhum resultado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex-col lg:flex-row flex items-center justify-between space-x-2 py-4">
            <div className="flex items-center space-x-2 mb-2 lg:mb-0">
              <p className="text-sm font-medium">Itens por página</p>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value))
                }}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue placeholder={table.getState().pagination.pageSize} />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-6">
              <p className="text-sm font-medium">
                Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
              </p>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  className="hidden h-8 w-8 p-0 lg:flex"
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                >
                  <span className="sr-only">Ir para primeira página</span>
                  <ChevronsLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="h-8 w-8 p-0"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  <span className="sr-only">Ir para a página anterior</span>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="h-8 w-8 p-0"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  <span className="sr-only">Ir para próxima página</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="hidden h-8 w-8 p-0 lg:flex"
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                >
                  <span className="sr-only">Ir para última página</span>
                  <ChevronsRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
