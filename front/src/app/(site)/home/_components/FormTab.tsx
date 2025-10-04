import { Search } from "@/components/icons/Search";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";

interface FormTabProps {
  type: "comprar" | "alugar" | "lancamentos"
}

const searchSchema = z.object({
  search: z.string().min(1, {
    message: "Campo obrigatório.",
  })
})

type FormData = z.infer<typeof searchSchema>

export function FormTab({ type }: FormTabProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search: "",
    },
  })

  const handleSubmit = form.handleSubmit(async (data) => {
    redirect(`/imoveis?search=${data.search}&finalidade=${type}`);
  })

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="form-contato relative">
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Cidade, Endereço, Código ou Tipo de Imóvel" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="!p-0 bg-transparent shadow-none hover:bg-transparent absolute top-1/2 -translate-y-1/2 right-5">
          <Search className="!w-[26px] !h-[26px] hidden md:block" />
        </Button>
      </form>
    </Form>
  )
}