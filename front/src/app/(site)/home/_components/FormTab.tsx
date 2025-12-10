import { Search } from "@/components/icons/Search";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

interface FormTabProps {
  type: "comprar" | "alugar" | "lancamentos"
}

type CitiesResponse = {
  Cidade: string[];
}

type CategoriesResponse = {
  Categoria: string[];
}

const searchSchema = z.object({
  city: z.string().optional(),
  categoria: z.string().optional(),
  codigo: z.string().optional(),
  endereco: z.string().optional()
})

type FormData = z.infer<typeof searchSchema>

export function FormTab({ type }: FormTabProps) {
  const [isLoadingCities, setIsLoadingCities] = useState(false);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [cities, setCities] = useState<CitiesResponse | null>(null);
  const [categories, setCategories] = useState<CategoriesResponse | null>(null);

  useEffect(() => {
    const fetchCities = async () => {
      setIsLoadingCities(true);
      try {
        const response = await fetch('/api/cities');

        if (!response.ok) {
          throw new Error(`Erro na API: ${response.status}`);
        }

        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.error('Erro ao buscar cidades:', error);
      } finally {
        setIsLoadingCities(false);
      }
    }

    fetchCities();
  }, [])

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoadingCategories(true);
      try {
        const response = await fetch('/api/categories');

        if (!response.ok) {
          throw new Error(`Erro na API: ${response.status}`);
        }

        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      } finally {
        setIsLoadingCategories(false);
      }
    }

    fetchCategories();
  }, [])
  
  const form = useForm<FormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      city: "",
      categoria: "",
      codigo: "",
      endereco: "",
    },
  })

  const handleSubmit = form.handleSubmit(async (data) => {
    redirect(`/imoveis?city=${data.city}&type=${data.categoria}&codigo=${data.codigo}&endereco=${data.endereco}&finalidade=${type}`);
  })

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="form-contato form-contato2 relative bg-white">
        <div className="flex py-[5px]">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="form-select2 border-r-[1px] w-full max-w-[200px] overflow-hidden">
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full cursor-pointer">
                      <div className="flex items-center gap-2">
                        {isLoadingCities ? (
                          <span className="flex text-[13px] items-center gap-2 text-content font-montserrat">
                            <Loader2 className="!h-4 !w-4 animate-spin" />
                            Cidades...
                          </span>
                        ) : (
                          <>
                            <SelectValue placeholder="Cidade" />
                          </>
                        )}
                      </div>
                    </SelectTrigger>
                  </FormControl>

                  {!isLoadingCities && (
                    <SelectContent>
                      {cities?.Cidade
                        .filter(city => city.trim() !== "")
                        .map((city, index) => (
                          <SelectItem
                            key={index}
                            value={city}
                            className="cursor-pointer font-montserrat"
                          >
                            {city}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  )}
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categoria"
            render={({ field }) => (
              <FormItem className="form-select2 border-r-[1px] w-full max-w-[200px] overflow-hidden">
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full cursor-pointer">
                      <div className="flex items-center gap-2">
                        {isLoadingCategories ? (
                          <span className="flex text-[13px] items-center gap-2 text-content font-montserrat">
                            <Loader2 className="!h-4 !w-4 animate-spin" />
                            Categorias...
                          </span>
                        ) : (
                          <>
                            <SelectValue placeholder="Tipo do Imóvel" />
                          </>
                        )}
                      </div>
                    </SelectTrigger>
                  </FormControl>

                  {!isLoadingCategories && (
                    <SelectContent>
                      {categories?.Categoria
                        .filter(city => city.trim() !== "")
                        .map((city, index) => (
                          <SelectItem
                            key={index}
                            value={city}
                            className="cursor-pointer font-montserrat"
                          >
                            {city}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  )}
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="codigo"
            render={({ field }) => (
              <FormItem className="border-r-[1px] w-full max-w-[130px] overflow-hidden">
                <FormControl>
                  <Input placeholder="Código" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endereco"
            render={({ field }) => (
              <FormItem className="border-r-[1px] w-full overflow-hidden pr-[40px]">
                <FormControl>
                  <Input placeholder="Endereço" {...field} className="focus-visible:ring-0" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="!p-0 bg-gold shadow-none hover:bg-black absolute top-1/2 -translate-y-1/2 right-3 !py-[10px] !px-[7px]">
          <Search className="!w-[22px] !h-[22px] hidden md:block !text-white" />
        </Button>
      </form>
    </Form>
  )
}