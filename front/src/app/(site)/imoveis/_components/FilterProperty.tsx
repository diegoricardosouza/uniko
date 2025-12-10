'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";

interface FilterPropertyProps {
  total?: string | number;
}

export function FilterProperty({ total }: FilterPropertyProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleOrderChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('orderDirection', value);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="container !mt-[20px] flex justify-between items-center">
      <p className="font-inter text-[13px] md:text-[17px] leading-[19px] text-content">
        {total} resultados
      </p>
      <div className="filterProperty">
        <Select
          defaultValue={searchParams.get('orderDirection') || "desc"}
          onValueChange={handleOrderChange}
        >
          <SelectTrigger className="w-full cursor-pointer">
            <div className="flex items-center gap-2">
              <SelectValue placeholder="Selecione o nível de acesso" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="desc" className="cursor-pointer">
              <span>Mais Recentes</span>
            </SelectItem>
            <SelectItem value="asc" className="cursor-pointer">
              <span>Mais Antigos</span>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}