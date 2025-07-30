'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { CheckCircle, Loader2, Lock, Mail, ShieldUserIcon, User } from "lucide-react";
import { BreadcrumbNewUser } from "../../_components/BreadcrumbNewUser";
import { useNewUserController } from "./useNewUserController";

export default function UsersNew() {
  const { form, isLoading, handleSubmit } = useNewUserController();
  
  return (
      <div>
      <BreadcrumbNewUser />
  
        <div className="flex flex-1 flex-col p-4 pt-0">
          {/* Main Content */}
          <div className="grid gap-4 md:grid-cols-3">
            {/* Formulário de Cadastro */}
            <div className="md:col-span-2">
              <Card>
                <CardHeader className="space-y-1">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <User className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Novo Usuário</CardTitle>
                      <CardDescription>Preencha os dados para criar um novo usuário no sistema</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                  <form onSubmit={handleSubmit} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome completo</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input placeholder="Digite o nome completo" className="pl-10" {...field} />
                              </div>
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

                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Senha</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input type="password" placeholder="Digite a senha" className="pl-10" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>Nível de Acesso</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="w-full cursor-pointer">
                                  <div className="flex items-center gap-2">
                                    <ShieldUserIcon className="h-4 w-4 text-gray-400" />
                                    <SelectValue placeholder="Selecione o nível de acesso" />
                                  </div>
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="ADMIN" className="cursor-pointer">
                                  <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                    <span>Administrador</span>
                                  </div>
                                </SelectItem>
                                <SelectItem value="EDITOR" className="cursor-pointer">
                                  <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    <span>Editor</span>
                                  </div>
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="active"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                Usuário Ativo
                              </FormLabel>
                              <FormDescription>Usuário pode fazer login no sistema</FormDescription>
                            </div>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <Button type="submit" className="w-full cursor-pointer" disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Cadastrando...
                          </>
                        ) : (
                          "Cadastrar"
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar com informações */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Dicas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-sm text-muted-foreground">
                    <p className="font-medium mb-1">💡 Níveis de Acesso:</p>
                    <p className="text-xs mb-2">• ADMIN: Acesso completo ao sistema</p>
                    <p className="text-xs mb-3">• EDITOR: Acesso limitado para edição</p>

                    <p className="font-medium mb-1">🔒 Segurança:</p>
                    <p className="text-xs">Senhas devem ter pelo menos 6 caracteres para garantir a segurança.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
}