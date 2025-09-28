'use client'

import { ELLIPSIS_LEFT, ELLIPSIS_RIGHT, usePagination } from "@/hooks/usePagination";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { CardFooter } from "./ui/card";
import { Pagination as CustomPagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";

interface PaginationProps {
  page: number;
  limit: number;
  total: number;
  showInfo?: boolean;
}

export function Pagination({ page, limit, total, showInfo = true }: PaginationProps) {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const { pages, isCurrentPage, isFirstPage, isLastPage } = usePagination({ page, limit, total });

  // Calcular informações para exibição
  const totalPages = Math.ceil(total / limit);
  const startItem = Math.min((page - 1) * limit + 1, total);
  const endItem = Math.min(page * limit, total);

  function generateUrl(targetPage: number) {
    const params = new URLSearchParams(searchParams);
    params.set('page', targetPage.toString());
    return `${pathName}?${params.toString()}`;
  }

  // Não renderizar se houver apenas uma página ou nenhum item
  if (total === 0 || totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Informações da paginação */}
      {showInfo && (
        <div className="text-sm text-gray-600">
          Mostrando <span className="font-medium">{startItem}</span> a{' '}
          <span className="font-medium">{endItem}</span> de{' '}
          <span className="font-medium">{total}</span> resultados
        </div>
      )}

      {/* Componente de paginação */}
      <CardFooter className="justify-center p-0">
        <CustomPagination>
          <PaginationContent className="gap-[10px]">
            {/* Botão Anterior */}
            <PaginationItem>
              {!isFirstPage ? (
                <Link
                  href={generateUrl(page - 1)}
                  className="cursor-pointer text-gray hover:bg-transparent hover:text-gold transition-all border-0 font-inter font-light text-[15px] text-content flex gap-1 items-center p-3"
                  aria-label={`Ir para página ${page - 1}`}
                >
                  <ChevronLeftIcon className="!w-5 !h-5" />
                  Anterior
                </Link>
              ) : (
                <PaginationPrevious
                  className="cursor-not-allowed hover:!bg-transparent opacity-50 border-0 font-inter text-[15px] text-content font-light shadow-none"
                  isActive
                  aria-disabled="true"
                />
              )}
            </PaginationItem>

            {/* Números das páginas */}
            {pages.map((p) => {
              const isCurrent = isCurrentPage(p);
              const isEllipsis = p === ELLIPSIS_LEFT || p === ELLIPSIS_RIGHT;

              if (isEllipsis) {
                return (
                  <PaginationItem key={p}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }

              return (
                <PaginationItem key={p} className="group rounded-md hover:border-orange transition-all">
                  {isCurrent ? (
                    <PaginationLink
                      className="cursor-default border-[2px] border-gold font-inter text-[15px] text-white font-light w-[37px] h-[37px] flex items-center justify-center !rounded-[10px_10px_10px_0px] bg-gold hover:bg-gold hover:text-white"
                      isActive={true}
                      aria-current="page"
                      aria-label={`Página atual, página ${p}`}
                    >
                      {p}
                    </PaginationLink>
                  ) : (
                    <Link
                      href={generateUrl(p)}
                      className="cursor-pointer border-[2px] border-content font-inter text-[15px] text-content font-light w-[37px] h-[37px] flex items-center justify-center !rounded-[10px_10px_10px_0px] hover:border-gold hover:text-gold hover:bg-transparent"
                      aria-label={`Ir para página ${p}`}
                    >
                      {p}
                    </Link>
                  )}
                </PaginationItem>
              );
            })}

            {/* Botão Próximo */}
            <PaginationItem>
              {!isLastPage ? (
                <Link
                  href={generateUrl(page + 1)}
                  className="cursor-pointer text-gray hover:bg-transparent hover:text-gold transition-all font-inter text-[15px] text-content font-light flex gap-1 items-center p-3"
                  aria-label={`Ir para página ${page + 1}`}
                >
                  Próximo
                  <ChevronRightIcon className="!w-5 !h-5" />
                </Link>
              ) : (
                <PaginationNext
                    className="cursor-not-allowed opacity-50 border-0 hover:bg-transparent font-inter text-[15px] text-content font-light shadow-none"
                  isActive
                  aria-disabled="true"
                />
              )}
            </PaginationItem>
          </PaginationContent>
        </CustomPagination>
      </CardFooter>

      {/* Informações adicionais (opcional) */}
      {showInfo && totalPages > 1 && (
        <div className="text-xs text-gray-500">
          Página {page} de {totalPages}
        </div>
      )}
    </div>
  );
}