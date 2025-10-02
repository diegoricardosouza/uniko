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
import { vistoriasSchema } from "@/schemas/vistoriasSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LuArrowRight } from "react-icons/lu";
import z from "zod";

type FormData = z.infer<typeof vistoriasSchema>

export function FormContestacao() {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(vistoriasSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      codeContract: "",
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
          <b>Observação: </b><br> ${data.message}</p>
        `

      const payload = {
        name: "Contestação de Vistorias",
        to: "diegoricardoweb@gmail.com",
        subject: "Contestação de Vistorias via site",
        htmlContent: html
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
          </div>

          <div className="space-y-[9px] mt-[10px] md:mt-0">
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