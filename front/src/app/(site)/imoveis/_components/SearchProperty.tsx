"use client";

import { ComboBox } from "@/components/ComboBox";
import { ComboBoxMultiply } from "@/components/ComboBoxMultiply";
import { Search } from "@/components/icons/Search";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { bedrooms, prices } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

type CitiesResponse = {
  Cidade: string[];
};

type NeighborhoodResponse = {
  Bairro: string[];
};

type CategoriesResponse = {
  Categoria: string[];
};

const searchSchema = z.object({
  city: z.string().optional(),
  // neighborhood: z.string().optional(),
  neighborhood: z.array(z.string()).optional(),
  categoria: z.string().optional(),
  codigo: z.string().optional(),
  prices: z.string().optional(),
  finalidade: z.string().optional(),
  bedrooms: z.string().optional(),
});

type FormData = z.infer<typeof searchSchema>;

export function SearchProperty() {
  const [isLoadingCities, setIsLoadingCities] = useState(false);
  const [isLoadingNeighborhood, setIsLoadingNeighborhood] = useState(false);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [cities, setCities] = useState<CitiesResponse | null>(null);
  const [neighborhood, setNeighborhood] = useState<NeighborhoodResponse | null>(
    null,
  );
  const [categories, setCategories] = useState<CategoriesResponse | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  // Obter valores dos searchParams
  const cityFilter =
    searchParams.get("city") === "curitiba"
      ? "Curitiba"
      : searchParams.get("city") === "belo-horizonte"
        ? "Belo Horizonte"
        : searchParams.get("city");
  const currentCity = cityFilter || "";
  const currentBairro = useMemo(
    () => searchParams.getAll("bairro") || [],
    [searchParams]
  );
  const currentType = searchParams.get("type") || "";
  const currentCodigo = searchParams.get("codigo") || "";
  const currentPrice = searchParams.get("price") || undefined;
  const currentFinalidade = searchParams.get("finalidade") || undefined;
  const currentBedrooms = searchParams.get("bedrooms") || undefined;

  const finalities = [
    {
      value: "comprar",
      label: "Comprar",
    },
    {
      value: "alugar",
      label: "Alugar",
    },
    {
      value: "lancamentos",
      label: "Lançamentos",
    },
  ];

  useEffect(() => {
    const fetchCities = async () => {
      setIsLoadingCities(true);
      try {
        const response = await fetch("/api/cities");

        if (!response.ok) {
          throw new Error(`Erro na API: ${response.status}`);
        }

        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.error("Erro ao buscar cidades:", error);
      } finally {
        setIsLoadingCities(false);
      }
    };

    fetchCities();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoadingCategories(true);
      try {
        const response = await fetch("/api/categories");

        if (!response.ok) {
          throw new Error(`Erro na API: ${response.status}`);
        }

        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const form = useForm<FormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      city: currentCity,
      neighborhood: currentBairro,
      categoria: currentType,
      codigo: currentCodigo,
      prices: currentPrice,
      finalidade: currentFinalidade,
      bedrooms: currentBedrooms,
    },
  });

  const selectedCity = form.watch("city");

  useEffect(() => {
    // Limpa o bairro quando a cidade mudar
    form.setValue("neighborhood", []);
    setNeighborhood(null);

    if (!selectedCity) return;

    const fetchNeighborhood = async () => {
      setIsLoadingNeighborhood(true);
      try {
        const response = await fetch(
          `/api/neighborhood?cidade=${encodeURIComponent(selectedCity)}`
        );
        if (!response.ok) {
          throw new Error(`Erro na API: ${response.status}`);
        }
        const data = await response.json();
        setNeighborhood(data);
      } catch (error) {
        console.error("Erro ao buscar bairros:", error);
      } finally {
        setIsLoadingNeighborhood(false);
      }
    };

    fetchNeighborhood();
  }, [form, selectedCity]);

  // Atualizar quando os params mudarem
  useEffect(() => {
    form.setValue("city", currentCity);
    form.setValue("neighborhood", currentBairro);
    form.setValue("categoria", currentType);
    form.setValue("codigo", currentCodigo);
    form.setValue("prices", currentPrice ?? "");
    form.setValue("finalidade", currentFinalidade ?? "");
    form.setValue("bedrooms", currentBedrooms ?? "");
  }, [
    currentCity,
    currentBairro,
    currentType,
    currentCodigo,
    currentPrice,
    currentFinalidade,
    currentBedrooms,
    form,
  ]);

  const handleSubmit = form.handleSubmit(async (data) => {
    const params = new URLSearchParams();

    if (data.city) params.set("city", data.city);
    if (data.neighborhood?.length) {
      data.neighborhood.forEach((b) => params.append("bairro", b));
    }
    if (data.categoria) params.set("type", data.categoria);
    if (data.codigo) params.set("codigo", data.codigo);
    if (data.prices && data.prices !== "all") {
      params.set("price", data.prices);
    } else {
      params.set("price", "");
    }
    if (data.bedrooms && data.bedrooms !== "all") {
      params.set("bedrooms", data.bedrooms);
    } else {
      params.set("bedrooms", "");
    }
    if (data.finalidade) params.set("finalidade", data.finalidade);

    router.push(`/imoveis?${params.toString()}`);
  });

  return (
    <div className="container !mt-[20px] flex justify-between items-center">
      <Form {...form}>
        <form
          onSubmit={handleSubmit}
          className="form-contato form-contato2 relative bg-white w-full border border-[#F0F0F0]"
        >
          <div className="md:flex py-[5px]">
            <FormField
              control={form.control}
              name="finalidade"
              render={({ field }) => (
                <FormItem className="form-select2 border-b-[1px] md:border-r-[1px] md:border-b-0 w-full md:max-w-[160px] overflow-hidden">
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || undefined}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full cursor-pointer">
                        <SelectValue placeholder="Finalidade" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {finalities.map((finality, index) => (
                        <SelectItem
                          key={index}
                          value={finality.value}
                          className="cursor-pointer font-montserrat"
                        >
                          {finality.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="form-select2 border-b-[1px] md:border-r-[1px] md:border-b-0 w-full md:max-w-[170px] overflow-hidden">
                  <ComboBox
                    field={field}
                    items={cities?.Cidade || []}
                    isLoading={isLoadingCities}
                    placeholder="Cidade"
                    searchPlaceholder="Buscar cidade..."
                    emptyMessage="Nenhuma cidade encontrado."
                    loadingMessage="Cidades..."
                    className="w-full"
                    classNameWidthItemSelected="md:!max-w-[96px]"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="neighborhood"
              render={({ field }) => (
                <FormItem className="form-select2 border-b-[1px] md:border-r-[1px] md:border-b-0 w-full md:max-w-[160px] overflow-hidden">
                  <ComboBoxMultiply
                    field={field}
                    items={neighborhood?.Bairro || []}
                    isLoading={isLoadingNeighborhood}
                    placeholder="Bairro"
                    searchPlaceholder="Buscar bairro..."
                    emptyMessage="Nenhum bairro encontrado."
                    loadingMessage="Bairros..."
                    className="w-full"
                    classNameWidthItemSelected="md:!max-w-[96px]"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categoria"
              render={({ field }) => (
                <FormItem className="form-select2 border-b-[1px] md:border-r-[1px] md:border-b-0 w-full md:max-w-[170px] overflow-hidden">
                  <ComboBox
                    field={field}
                    items={categories?.Categoria || []}
                    isLoading={isLoadingCategories}
                    placeholder="Categoria"
                    searchPlaceholder="Buscar categoria..."
                    emptyMessage="Nenhuma categoria encontrada."
                    loadingMessage="Categorias..."
                    className="w-full"
                    classNameWidthItemSelected="md:!max-w-[96px]"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bedrooms"
              render={({ field }) => (
                <FormItem className="form-select2 border-b-[1px] md:border-r-[1px] md:border-b-0 w-full md:max-w-[160px] overflow-hidden">
                  <Select
                    key={currentBedrooms || "empty"}
                    onValueChange={field.onChange}
                    value={field.value ?? undefined}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full cursor-pointer">
                        <div className="truncate md:max-w-[96px]">
                          <SelectValue placeholder="Quartos" />
                        </div>
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {bedrooms.map((price, index) => (
                        <SelectItem
                          key={index}
                          value={price.value}
                          className="cursor-pointer font-montserrat"
                        >
                          {price.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="codigo"
              render={({ field }) => (
                <FormItem className="border-b-[1px] md:border-r-[1px] md:border-b-0 w-full md:max-w-[160px] overflow-hidden">
                  <FormControl>
                    <Input placeholder="Código" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="prices"
              render={({ field }) => (
                <FormItem className="form-select2 md:border-r-[1px] w-full md:max-w-[160px] overflow-hidden">
                  <Select
                    key={currentPrice || "empty"}
                    onValueChange={field.onChange}
                    value={field.value ?? undefined}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full cursor-pointer">
                        <div className="truncate md:max-w-[96px]">
                          <SelectValue placeholder="Preço" />
                        </div>
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {prices.map((price, index) => (
                        <SelectItem
                          key={index}
                          value={price.value}
                          className="cursor-pointer font-montserrat"
                        >
                          {price.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            className="!p-0 bg-gold shadow-none hover:bg-black md:absolute md:top-1/2 md:-translate-y-1/2 md:right-3 !py-[10px] !px-[7px] w-full md:w-auto"
          >
            <Search className="!w-[22px] !h-[22px] md:block !text-white" />
          </Button>
        </form>
      </Form>
    </div>
  );
}
