'use client';

import { sendMailAction } from "@/app/actions/emails/send-mail";
import { getFinalitiesAction } from "@/app/actions/finalities/get-finalities";
import { getTypesAction } from "@/app/actions/types/get-types";
import { ErrorMessage } from "@/components/errorMessage";
import { SuccessMessage } from "@/components/SuccessMessage";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Finality } from "@/entities/Finality";
import { Type } from "@/entities/Type";
import { cn } from "@/lib/utils";
import { anuncieSchema } from "@/schemas/anuncieSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowDown, Loader2, Paperclip } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LuArrowRight } from "react-icons/lu";
import z from "zod";

type FormData = z.infer<typeof anuncieSchema>

export function FormAnunciar() {
  const searchParams = useSearchParams();
  const city = searchParams.get('city');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [types, setTypes] = useState<Type[] | null>([]);
  const [finalities, setFinalities] = useState<Finality[] | null>([]);
  const [isLoadingTypes, setIsLoadingTypes] = useState(false);
  const [isLoadingFinalities, setIsLoadingFinalities] = useState(false);
  const [fileName, setFileName] = useState<string>("Nenhum arquivo escolhido")
  
  const form = useForm<FormData>({
    resolver: zodResolver(anuncieSchema),
    defaultValues: {
      type: "",
      city: "",
      neighborhood: "",
      finality: "",
      bedrooms: "",
      parkingSpaces: "",
      name: "",
      email: "",
      phone: "",
      accept: false,
    },
  })

  const options = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4+", label: "4+" },
  ]

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        setIsLoadingTypes(true)
        const types = await getTypesAction();
        setTypes(types);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoadingTypes(false)
      }
    }

    fetchTypes();
  }, [])

  useEffect(() => {
    const fetchFinalities = async () => {
      try {
        setIsLoadingFinalities(true)
        const finalities = await getFinalitiesAction();
        setFinalities(finalities);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoadingFinalities(false)
      }
    }

    fetchFinalities();
  }, [])

  function resetStatusMessage() {
    setSuccess(false);
  }

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      setIsLoading(true)

      const html = `
          <p><b>Tipo do imóvel: </b>${data.type}<br>
          <b>Cidade: </b>${data.city}<br>
          <b>Bairro: </b>${data.neighborhood}<br>
          <b>Finalidade: </b> ${data.finality}<br>
          <b>Dormitórios: </b> ${data.bedrooms}<br>
          <b>Vagas: </b> ${data.parkingSpaces}<br>
          <b>Nome: </b> ${data.name}<br>
          <b>E-mail: </b> ${data.email}<br>
          <b>Telefone: </b> ${data.phone}
          </p>
        `

      const attachments: File[] = [];
      if (data.file instanceof File) {
        attachments.push(data.file);
      }

      const subject = !city && city === 'curitiba' ? 'Anuncie Imóvel Curitiba' : 'Anuncie Imóvel Belo Horizonte'
      const nameForm = !city && city === 'curitiba' ? 'Anuncie Imóvel Curitiba' : 'Anuncie Imóvel Belo Horizonte'

      const payload = {
        name: nameForm,
        to: "diegoricardoweb@gmail.com",
        subject,
        htmlContent: html,
        attachments: attachments.length > 0 ? attachments : undefined
      }

      await sendMailAction(payload);

      setSuccess(true);
      form.reset()
      setFileName('Nenhum arquivo escolhido')
    } catch (error) {
      console.log('error', error);
      setError(true);
    } finally {
      setIsLoading(false)
    }
  })
  
  return (
    <Form {...form}>
      {success && <SuccessMessage onClose={resetStatusMessage} className="mb-4" />}
            {error && <ErrorMessage onClose={resetStatusMessage} className="mb-4" />}

      <form onSubmit={handleSubmit} className="form-contato">
        <div className="bg-gold text-center py-[10px] font-montserrat text-[18px] font-semibold text-white mb-[10px]">
          DADOS PARA DIVULGAR MEU IMÓVEL
        </div>

        <div className="flex flex-col md:grid grid-cols-3 gap-[10px] md:gap-[23px] mb-[10px]">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="form-select">
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full cursor-pointer">
                      <div className="flex items-center gap-2">
                        {isLoadingTypes ? (
                          <span className="flex items-center gap-2 text-content font-montserrat">
                            <Loader2 className="!h-4 !w-4 animate-spin" />
                            Carregando os tipos...
                          </span>
                        ) : (
                          <>
                            <SelectValue placeholder="Tipo do imóvel" />
                          </>
                        )}
                      </div>
                    </SelectTrigger>
                  </FormControl>

                  {!isLoadingTypes && (
                    <SelectContent>
                      {types?.map((city) => (
                        <SelectItem
                          key={city.id}
                          value={city.name}
                          className="cursor-pointer font-montserrat"
                        >
                          {city.name}
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
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Cidade" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="neighborhood"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Bairro" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col md:grid grid-cols-3 gap-[10px] md:gap-[23px] mb-[10px]">
          <FormField
            control={form.control}
            name="finality"
            render={({ field }) => (
              <FormItem className="form-select">
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full cursor-pointer">
                      <div className="flex items-center gap-2">
                        {isLoadingFinalities ? (
                          <span className="flex items-center gap-2 text-content font-montserrat">
                            <Loader2 className="!h-4 !w-4 animate-spin" />
                            Carregando as finalidades...
                          </span>
                        ) : (
                          <>
                            <SelectValue placeholder="Finalidade" />
                          </>
                        )}
                      </div>
                    </SelectTrigger>
                  </FormControl>

                  {!isLoadingFinalities && (
                    <SelectContent>
                      {finalities?.map((finality) => (
                        <SelectItem
                          key={finality.id}
                          value={finality.name}
                          className="cursor-pointer font-montserrat"
                        >
                          {finality.name}
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
            name="bedrooms"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  {/* radiogroup container (acessível) */}
                  <div className="flex items-center gap-5">
                    <span className="flex-1 font-montserrat text-[14px] md:text-[18px] text-content">
                      Dormitório(s)
                    </span>

                    <div role="radiogroup" aria-label="Número de quartos" className="flex gap-0 border border-border rounded-none overflow-hidden bg-background">
                      {options.map((option, index) => {
                        const isSelected = String(field.value) === String(option.value);

                        return (
                          <div
                            key={option.value}
                            className={cn(
                              "flex-1 relative",
                              index !== options.length - 1 && "border-r border-[#E7E7E7]"
                            )}
                          >
                            <input
                              id={`bedroom-${option.value}`}
                              type="radio"
                              name="bedrooms"
                              className="sr-only"
                              value={option.value}
                              checked={isSelected}
                              onChange={() => field.onChange(option.value)}
                            />

                            <label
                              htmlFor={`bedroom-${option.value}`}
                              className={cn(
                                "flex items-center justify-center px-4 py-3 text-center text-[15px] md:text-[17px] font-normal cursor-pointer transition-colors w-[50px] h-[50px] md:h-[62px] md:w-[62px] font-inter text-content",
                                isSelected ? "bg-gold text-white" : "hover:bg-muted/50"
                              )}
                            >
                              {option.label}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="parkingSpaces"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  {/* radiogroup container (acessível) */}
                  <div className="flex items-center gap-5">
                    <span className="flex-1 font-montserrat text-[14px] md:text-[18px] text-content">
                      Vaga(s)
                    </span>

                    <div role="radiogroup" aria-label="Número de vagas" className="flex gap-0 border border-border rounded-none overflow-hidden bg-background">
                      {options.map((option, index) => {
                        const isSelected = String(field.value) === String(option.value);

                        return (
                          <div
                            key={option.value}
                            className={cn(
                              "flex-1 relative",
                              index !== options.length - 1 && "border-r border-[#E7E7E7]"
                            )}
                          >
                            <input
                              id={`parkingSpaces-${option.value}`}
                              type="radio"
                              name="parkingSpaces"
                              className="sr-only"
                              value={option.value}
                              checked={isSelected}
                              onChange={() => field.onChange(option.value)}
                            />

                            <label
                              htmlFor={`parkingSpaces-${option.value}`}
                              className={cn(
                                "flex items-center justify-center px-4 py-3 text-center text-[15px] md:text-[17px] font-normal cursor-pointer transition-colors w-[50px] h-[50px] md:h-[62px] md:w-[62px] font-inter text-content",
                                isSelected ? "bg-gold text-white" : "hover:bg-muted/50"
                              )}
                            >
                              {option.label}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex w-full h-[50px] md:h-[62px] items-center justify-between border border-none rounded-none overflow-hidden bg-white cursor-pointer px-[20px]">
                  {/* Input escondido (controlado pelo RHF) */}
                  <input
                    id="file"
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      field.onChange(file) // atualiza o react-hook-form
                      setFileName(file ? file.name : "Nenhum arquivo escolhido")
                    }}
                  />

                  {/* Texto + ícone */}
                  <label
                    htmlFor="file"
                    className={cn(
                      "flex items-center gap-2 text-[14px] md:text-[18px] text-content cursor-pointer flex-1 font-montserrat"
                    )}
                  >
                    <Paperclip className="h-5 w-5" />
                    <span className="truncate">{fileName}</span>
                  </label>

                  {/* Botão à direita */}
                  <label htmlFor="file" className="hidden md:block">
                    <div
                      className="flex border border-content h-full text-sm font-inter text-[14px] uppercase font-medium px-[15px] text-content py-[7px] cursor-pointer"
                    >
                      Anexar foto
                      <ArrowDown className="ml-3.5 h-4 w-4" />
                    </div>
                  </label>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="bg-gold text-center py-[10px] font-montserrat text-[18px] font-semibold text-white mb-[10px] mt-[30px]">
          DADOS PARA CONTATO
        </div>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Nome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col md:grid grid-cols-2 gap-[10px] md:gap-[19px] mt-[10px]">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="email" placeholder="Seu melhor e-mail" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="tel" placeholder="DDD + Celular / Whatsapp" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="md:grid grid-cols-2 gap-[19px] mt-5">
          <div></div>

          <FormField
            control={form.control}
            name="accept"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex gap-[7px] items-start">
                    <Checkbox
                      id="terms"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="w-5 h-5 bg-white rounded-none border-gold data-[state=checked]:bg-gold data-[state=checked]:border-gold"
                    />
                    <Label
                      htmlFor="terms"
                      className="form-label-accept cursor-pointer"
                    >
                      Autorizo o tratamento dos meus dados pessoais de forma livre eesclarecida na Politica de Privacidade e no Termos de Uso. Conforme Lei n° 13.709/18 - LGPD
                    </Label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-center mt-[30px]">
          <Button type="submit" className="cursor-pointer form-button-submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                Enviar Mensagem
                <LuArrowRight className="w-[15px] h-[15px] lg:w-[18px] lg:h-[18px] ml-[-3px]" />
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}