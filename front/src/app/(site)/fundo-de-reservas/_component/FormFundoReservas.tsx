'use client';

import { sendMailAction } from "@/app/actions/emails/send-mail";
import { ErrorMessage } from "@/components/errorMessage";
import { SuccessMessage } from "@/components/SuccessMessage";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { fundosReservasSchema } from "@/schemas/fundosReservasSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowDown, Loader2, Paperclip } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LuArrowRight } from "react-icons/lu";
import z from "zod";

type FormData = z.infer<typeof fundosReservasSchema>

export function FormFundoReservas() {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [fileName, setFileName] = useState<string>("Nenhum arquivo escolhido")
  const [fileName2, setFileName2] = useState<string>("Nenhum arquivo escolhido")

  const form = useForm<FormData>({
    resolver: zodResolver(fundosReservasSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      codeContract: "",
      month: "",
      maturity: "",
      accept: false,
    },
  })

  function resetStatusMessage() {
    setSuccess(false);
  }

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      setIsLoading(true)
      
      const html = `
          <p><b>Nome: </b>${data.name}<br>
          <b>E-mail: </b>${data.email}<br>
          <b>Telefone: </b>${data.phone}<br>
          <b>Código do Contrato: </b>${data.codeContract}<br>
          <b>Mês do Condomínio: </b>${data.month}<br>
          <b>Vencimento Condomínio: </b>${data.maturity}<br>
          <b>Observação: </b><br> ${data.message}</p>
        `

      // Only include attachments if all are of the same type (File[] or string[])
      const attachments: File[] = [];
      if (data.file1 instanceof File) {
        attachments.push(data.file1);
      }
      if (data.file2 instanceof File) {
        attachments.push(data.file2);
      }

      const payload = {
        name: "Fundo de Reservas",
        to: "diegoricardoweb@gmail.com",
        subject: "Fundo de Reservas via site",
        htmlContent: html,
        attachments: attachments.length > 0 ? attachments : undefined
      }

      await sendMailAction(payload);

      setSuccess(true);
      form.reset()
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
        <div className="md:grid grid-cols-2 gap-5">
          <div className="space-y-[10px]">
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

            <FormField
              control={form.control}
              name="month"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Mês do Condomínio*" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="file1"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex w-full h-[50px] md:h-[62px] items-center justify-between border border-none rounded-none overflow-hidden bg-white cursor-pointer px-[20px] gap-5">
                      {/* Input escondido (controlado pelo RHF) */}
                      <input
                        id="file1"
                        type="file"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          field.onChange(file) // atualiza o react-hook-form
                          setFileName(file ? file.name : "Nenhum arquivo escolhido")
                        }}
                      />
                      
                      {/* Botão à direita */}
                      <label htmlFor="file1" className="hidden md:block min-w-[211px]">
                        <div
                          className="flex border border-content h-full text-sm font-inter text-[14px] uppercase font-light px-[15px] text-content py-[7px] cursor-pointer"
                        >
                          BOLETO CONDOMÍNIO
                          <ArrowDown className="ml-[10px] h-4 w-4" />
                        </div>
                      </label>

                      {/* Texto + ícone */}
                      <label
                        htmlFor="file1"
                        className={cn(
                          "flex items-center gap-2 text-[14px] md:text-[18px] text-content cursor-pointer flex-1 font-montserrat"
                        )}
                      >
                        <Paperclip className="h-5 w-5" />
                        <span className="truncate max-w-[300px]">{fileName}</span>
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="file2"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex w-full h-[50px] md:h-[62px] items-center justify-between border border-none rounded-none overflow-hidden bg-white cursor-pointer px-[20px] gap-5">
                      {/* Input escondido (controlado pelo RHF) */}
                      <input
                        id="file"
                        type="file"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          field.onChange(file) // atualiza o react-hook-form
                          setFileName2(file ? file.name : "Nenhum arquivo escolhido")
                        }}
                      />
                      
                      {/* Botão à direita */}
                      <label htmlFor="file" className="hidden md:block min-w-[256px]">
                        <div
                          className="flex border border-content h-full text-sm font-inter text-[14px] uppercase font-light px-[15px] text-content py-[7px] cursor-pointer"
                        >
                          COMPROVANTE PAGAMENTO
                          <ArrowDown className="ml-[10px] h-4 w-4" />
                        </div>
                      </label>

                      {/* Texto + ícone */}
                      <label
                        htmlFor="file"
                        className={cn(
                          "flex items-center gap-2 text-[14px] md:text-[18px] text-content cursor-pointer flex-1 font-montserrat"
                        )}
                      >
                        <Paperclip className="h-5 w-5" />
                        <span className="truncate max-w-[255px]">{fileName2}</span>
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-[9px] mt-[10px] md:mt-0">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="email" placeholder="E-mail" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="codeContract"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Código do Contrato" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="maturity"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Vencimento Condomínio*" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea placeholder="Observação" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                        Autorizo o tratamento dos meus dados pessoais de forma livre e esclarecida na Politica de Privacidade e no Termos de Uso. Conforme Lei n° 13.709/18 - LGPD
                      </Label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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