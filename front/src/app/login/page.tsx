'use client';

import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { AlertCircle, ArrowLeft, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/unikoLogo.webp";
import { useLoginPasswordController } from "./useLoginPasswordController";

export default function LoginPage() {
  const { handleSubmit, register, errors, loading, errorApi } = useLoginPasswordController();

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex items-center justify-center">
          <Image src={logo} alt="Logo Uniko" className="w-[150px]" priority />
        </div>
        
        <div className={cn("flex flex-col gap-6")}>
          <Card>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col items-center gap-2 text-center mb-6">
                  <h1 className="text-2xl font-bold">Faça login</h1>
                  <p className="text-muted-foreground text-sm text-balance">
                    Digite seus dados abaixo para acessar o painel
                  </p>
                </div>

                {errorApi && (
                  <Alert className="border-red-200 bg-red-50 text-red-800 mb-6">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <AlertTitle>Credenciais inválidas.</AlertTitle>
                  </Alert>
                )}

                <div className="grid gap-6">
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="email@site.com"
                        {...register('email')}
                        error={errors.email?.message}
                      />
                    </div>
                    <div className="grid gap-3">
                      <div className="flex items-center">
                        <Label htmlFor="password">Senha</Label>
                        
                      </div>
                      <Input 
                        id="password" 
                        type="password"
                        {...register('password')}
                        error={errors.password?.message}
                      />
                    </div>
                    <Button type="submit" className="w-full cursor-pointer">
                      {loading && <Loader2 className="animate-spin" />}
                      Acessar
                    </Button>
                  </div>
                  <div className="text-center text-sm">
                    <Link href="/forgot-password" className="ml-auto text-sm underline-offset-4 hover:underline">
                      Esqueceu sua senha?
                    </Link>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
          <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
            <Link href="/" className="flex justify-center items-center gap-2">
              <ArrowLeft className="w-4 h-4 mt-1" /> Voltar para o site. 
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
