'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Setting } from "@/entities/Setting";
import { BookOpen, Loader2, Save, Type } from "lucide-react";
import { useSeoController } from "../useSeoController";

interface SeoFormProps {
  setting: Setting[]
}

export function SeoForm({ setting }: SeoFormProps) {
  const { form, isLoading, onSubmit } = useSeoController(setting);

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <Card className="bg-gradient-card shadow-card border-0 py-0">
          <CardHeader className="gap-0">
            <CardTitle className="flex items-center gap-2 text-lg">
              Configurações de SEO
            </CardTitle>
            <CardDescription>
              <p className="text-sm text-muted-foreground">
                Otimize títulos, descrições e palavras-chave para melhorar o posicionamento do seu site nos mecanismos de busca.
              </p>
            </CardDescription>
            <hr className="mt-[20px]" />
          </CardHeader>

          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título do Site *</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Type className="absolute left-3 top-[10px] h-4 w-4 text-gray-400" />
                      <Input
                        type="text"
                        className="transition-smooth focus:shadow-primary pl-10"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição do Site *</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <BookOpen className="absolute left-3 top-[10px] h-4 w-4 text-gray-400" />
                      <Textarea
                        id="seo-description"
                        className="transition-smooth focus:shadow-primary pl-10 h-[160px]"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Atualizando...
                </>
              ) : (
                <>
                    <Save className="h-4 w-4 mr-2" />
                    Salvar SEO
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </form>
    </Form>
  )
}