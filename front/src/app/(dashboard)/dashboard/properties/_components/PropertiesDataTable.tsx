/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { deletePropertyAction } from "@/app/actions/properties/delete-property";
import { getTypesAction } from "@/app/actions/types/get-types";
import { Spinner } from "@/components/Spinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Property } from "@/entities/Property";
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
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, CirclePlus, Loader2, Plus, Search, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useColumnsProperties } from "./useColumnsProperties";


interface PostsDataTableProps {
  properties: Property[];
  isLoading?: boolean;
}

export function PropertiesDataTable({ properties, isLoading }: PostsDataTableProps) {
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [statusFilter, setStatusFilter] = useState<string[]>([])
  const [statusSearch, setStatusSearch] = useState("")
  const [globalFilter, setGlobalFilter] = useState("")
  const [categories, setCategories] = useState<{ slug: string, name: string }[]>([])
  const [typeOptions, setTypeOptions] = useState<
    { value: string, label: string, count: number }[]
  >([])

  const handleDelete = async (id: string) => {
    try {
      await deletePropertyAction(id);
      toast.success('Imóvel excluído com sucesso!')
    } catch (error: any) {
      toast.error(error.message || 'Erro ao excluir imóvel')
    }
  }

  const columnsUser = useColumnsProperties(handleDelete);

  // Calculate actual counts for each status
  const typeCounts = useMemo(() => {
    return properties?.reduce(
      (acc, post) => {
        const categories = post.types || []
        for (const cat of categories) {
          const slug = cat?.slug
          if (slug) {
            acc[slug] = (acc[slug] || 0) + 1
          }
        }
        return acc
      },
      {} as Record<string, number>,
    )
  }, [properties])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoadingCategories(true);
        const data = await getTypesAction()
        setCategories(
          (data ?? [])
            .filter((cat: any) => typeof cat.slug === "string" && typeof cat.name === "string")
            .map((cat: any) => ({
              slug: cat.slug as string,
              name: cat.name as string,
            }))
        )
      } catch (error) {
        console.error('Erro ao carregar categorias', error)
      } finally {
        setIsLoadingCategories(false);
      }
    }

    fetchCategories()
  }, [])

  useEffect(() => {
    if (categories.length === 0) return

    const options = categories.map((category) => ({
      value: category.slug,
      label:
        category.name.charAt(0).toUpperCase() +
        category.name.slice(1).toLowerCase(),
      count: category?.slug ? typeCounts[category.slug] || 0 : 0,
    }))

    setTypeOptions(options)
  }, [categories, typeCounts])

  // Update typeOptions with real counts
  // const typeOptions = useMemo(async () => {
  //   // const uniqueCategories = Array.from(new Set(posts.flatMap(post => post.categories || [])))
  //   const categories = await categoryPostsService.getAll();

  //   return categories.map((category) => ({
  //     value: category.slug,
  //     label: category.name.charAt(0).toUpperCase() + category.name.slice(1).toLowerCase(), // capitalize
  //     count: category?.slug ? typeCounts[category.slug] || 0 : 0,
  //   }))
  // }, [typeCounts])

  const table = useReactTable({
    data: properties,
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

  const filteredStatusOptions = typeOptions?.filter((option) =>
    option.label.toLowerCase().includes(statusSearch.toLowerCase()),
  )

  const handleStatusToggle = (value: string) => {
    setStatusFilter((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value],
    )
  }

  const clearFilters = () => {
    setStatusFilter([])
    setStatusSearch("")
  }

  useEffect(() => {
    if (statusFilter.length > 0) {
      table.getColumn("types")?.setFilterValue(statusFilter)
    } else {
      table.getColumn("types")?.setFilterValue(undefined)
    }
  }, [statusFilter, table])

  // Get display text for status button
  const getStatusDisplay = () => {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center">
          <CirclePlus className="mr-2 h-4 w-4" />
          Tipos
        </div>
        {statusFilter.length > 0 && statusFilter.length <= 2 && (
          <>
            <div className="h-4 w-px bg-border" />
            <div className="flex gap-1">
              {statusFilter.map((status) => {
                const option = typeOptions?.find((opt) => opt.value === status)
                return (
                  <div
                    key={status}
                    className="inline-flex items-center rounded-sm bg-muted px-2 py-0.5 text-xs"
                  >
                    {option?.label || status}
                  </div>
                )
              })}
            </div>
          </>
        )}
        {statusFilter.length > 2 && (
          <>
            <div className="h-4 w-px bg-border" />
            <Badge variant="secondary" className="rounded-sm px-1 text-xs">
              {statusFilter.length} selecionados
            </Badge>
          </>
        )}
      </div>
    )
  }

  return (
    <>
      <div className="flex">
        <Button asChild>
          <Link href="/dashboard/properties/new">
            <Plus className="mr-1 h-4 w-4" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Novo Imóvel
            </span>
          </Link>
        </Button>
      </div>

      <div className="w-full min-h-[300px] relative overflow-hidden">
        {isLoading && (
          <div className="w-full h-full flex justify-center items-center absolute top-0 left-0 bg-white z-50">
            <Spinner className="w-6 h-6 fill-primary" />
          </div>
        )}
        <div>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 py-4">
              <Input
                placeholder="Filtrar imóveis..."
                value={globalFilter}
                onChange={(event) => setGlobalFilter(event.target.value)}
                className="max-w-sm"
              />
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9 border-dashed text-sm">
                    {getStatusDisplay()}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0" align="start">
                  <div className="flex items-center border-b px-2">
                    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                    <input
                      placeholder="Tipos"
                      className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                      value={statusSearch}
                      onChange={(e) => setStatusSearch(e.target.value)}
                    />
                  </div>
                  <div className="max-h-[300px] overflow-auto p-1">
                    {isLoadingCategories && (
                      <div className="min-h-10 bg-white w-full flex items-center justify-center">
                        <Loader2 className="animate-spin w-4 h-4" />
                      </div>
                    )}
                    {filteredStatusOptions.map((option) => (
                      <div
                        key={option.value}
                        className="flex items-center justify-between rounded-sm px-2 py-1.5 hover:bg-muted"
                      >
                        <div className="flex items-center gap-2 text-sm font-light">
                          <Checkbox
                            id={option.value}
                            checked={statusFilter.includes(option.value)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                handleStatusToggle(option.value)
                              } else {
                                handleStatusToggle(option.value)
                              }
                            }}
                          />
                          <label htmlFor={option.value} className="flex-1 cursor-pointer font-medium">
                            {option.label}
                          </label>
                        </div>
                        <span className="text-muted-foreground text-sm">{option.count}</span>
                      </div>
                    ))}
                  </div>
                  {statusFilter.length > 0 && (
                    <div className="border-t p-1">
                      <Button variant="ghost" className="w-full justify-center font-normal text-sm h-8" onClick={clearFilters}>
                        Limpar Filtros
                      </Button>
                    </div>
                  )}
                </PopoverContent>
              </Popover>
              {statusFilter.length > 0 && (
                <Button variant="ghost" onClick={clearFilters} className="h-8 px-2 lg:px-3">
                  Limpar
                  <X className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>

            <span className="text-sm">{properties.length} itens</span>
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
