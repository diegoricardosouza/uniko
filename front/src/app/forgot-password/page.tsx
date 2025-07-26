'use client'

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent
} from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { AlertCircle, CheckCircle2Icon, Loader2, Mail } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import logo from "../../../public/unikoLogo.webp"
import { useForgotPasswordController } from "./useForgotPasswordController"

export default function ForgotPassword() {
  const { handleSubmit, form, loading, errorApi, success } = useForgotPasswordController();

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex items-center justify-center">
          <Image src={logo} alt="Logo Uniko" className="w-[150px]" priority />
        </div>

        <div className={cn("flex flex-col gap-6")}>
          <Card>
            <CardContent>
              <Form {...form}>
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col items-center gap-2 text-center mb-6">
                    <h1 className="text-2xl font-bold">Recuperar senha</h1>
                    <p className="text-muted-foreground text-sm text-balance">
                      Digite seu e-mail para recuperar a senha
                    </p>
                  </div>

                  {success && (
                    <Alert className="border-green-200 bg-green-50 text-green-800 mb-6">
                      <CheckCircle2Icon className="h-4 w-4 text-green-600" />
                      <AlertTitle>Sucesso!</AlertTitle>
                      <AlertDescription>
                        Um email de recuperação de senha foi enviado para o seu endereço de email. Verifique sua caixa de entrada e siga
                        as instruções para redefinir sua senha.
                      </AlertDescription>
                    </Alert>
                  )}

                  {errorApi && (
                    <Alert className="border-red-200 bg-red-50 text-red-800 mb-6">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                      <AlertTitle>Erro na recuperação</AlertTitle>
                      <AlertDescription>
                        Não foi possível enviar o email de recuperação de senha.
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input type="email" placeholder="usuario@exemplo.com" className="pl-10" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full cursor-pointer" disabled={loading}>
                      {loading && <Loader2 className="animate-spin" />}
                      Recuperar senha
                    </Button>
                  </div>

                  <div className="text-center text-sm mt-4">
                    <Link href="/login" className="ml-auto text-sm underline-offset-4 hover:underline">
                      Fazer login
                    </Link>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
