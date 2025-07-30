'use client';

/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { BookOpen, FileText, ImageIcon, Loader2, Tag, Type } from "lucide-react";
import dynamic from "next/dynamic";
import { BreadcrumbNewBlog } from "../../_components/BreadcrumbNewBlog";
import { useNewBlogController } from "./useNewBlogController";

// Importação dinâmica sem SSR
const TinyEditor = dynamic(() => import('../../_components/TinyEditor'), {
  ssr: false,
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded">Carregando editor...</div>
})

export default function NewBlog() {
  const { form, handleSubmit, handleImageChange, imagePreview, isLoading, categorias } = useNewBlogController();

  return (
    <div>
      <BreadcrumbNewBlog />

      <div className="flex flex-1 flex-col p-4 pt-0">
        <div className="grid gap-4 md:grid-cols-1">
          <Card>
            <CardHeader className="space-y-1">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <FileText className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">Novo Post do Blog</CardTitle>
                  <CardDescription>Crie um novo artigo para o seu blog</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Coluna 1 */}
                    <div className="space-y-4 col-span-2">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Título do Post</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Type className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input placeholder="Digite o título do seu post" className="pl-10" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="subtitle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subtítulo</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Type className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input placeholder="Uma breve descrição do post" className="pl-10" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <BookOpen className="h-4 w-4 text-gray-400" />
                              Conteúdo do Post
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <BookOpen className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                {/* <Textarea
                                  placeholder="Escreva o conteúdo completo do seu post aqui..."
                                  className="pl-10 min-h-[200px] resize-y"
                                  {...field}
                                /> */}
                                <TinyEditor />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Coluna 2 */}
                    <div className="space-y-4 col-span-1">
                      <FormField
                        control={form.control}
                        name="featuredImage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Imagem de Destaque</FormLabel>
                            <FormControl>
                              <div className="space-y-4">
                                <div
                                  className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-gray-400 transition-colors cursor-pointer group"
                                  onClick={() => document.getElementById("image-upload")?.click()}
                                >
                                  <input
                                    id="image-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                  />
                                  {imagePreview ? (
                                    <div className="relative">
                                      <img
                                        src={imagePreview || "/placeholder.svg"}
                                        alt="Preview"
                                        className="w-full h-48 object-cover rounded-lg"
                                      />
                                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all rounded-lg flex items-center justify-center">
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                          <div className="bg-white rounded-full p-2">
                                            <ImageIcon className="h-5 w-5 text-gray-600" />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="text-center">
                                      <ImageIcon className="mx-auto h-12 w-12 text-gray-400 group-hover:text-gray-500 transition-colors" />
                                      <div className="mt-4">
                                        <p className="text-sm font-medium text-gray-900 group-hover:text-gray-700">
                                          Clique para selecionar uma imagem
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF até 10MB</p>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </FormControl>
                            <FormDescription>Imagem que aparecerá como capa do post</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="categories"
                        render={() => (
                          <FormItem>
                            <div className="mb-4">
                              <FormLabel className="flex items-center gap-2">
                                <Tag className="h-4 w-4 text-gray-400" />
                                Categorias
                              </FormLabel>
                              <FormDescription>Selecione uma ou mais categorias para o seu post</FormDescription>
                            </div>
                            <div className="max-h-60 overflow-y-auto pr-2 border rounded-md p-3">
                              {" "}
                              {/* Adicionado max-h e overflow */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {categorias.map((categoria) => (
                                  <FormField
                                    key={categoria.id}
                                    control={form.control}
                                    name="categories"
                                    render={({ field }) => {
                                      return (
                                        <FormItem key={categoria.id}>
                                          <FormControl>
                                            <div className="flex items-center space-x-2">
                                              <Checkbox
                                                id={categoria.id}
                                                checked={field.value?.includes(categoria.id)}
                                                onCheckedChange={(checked) => {
                                                  return checked
                                                    ? field.onChange([...field.value, categoria.id])
                                                    : field.onChange(
                                                      field.value?.filter((value) => value !== categoria.id),
                                                    )
                                                }}
                                              />
                                              <FormLabel
                                                htmlFor={categoria.id}
                                                className="text-sm font-normal cursor-pointer hover:text-gray-700 transition-colors"
                                              >
                                                {categoria.label}
                                              </FormLabel>
                                            </div>
                                          </FormControl>
                                        </FormItem>
                                      )
                                    }}
                                  />
                                ))}
                              </div>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button type="submit" className="flex-1 cursor-pointer" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Publicando...
                        </>
                      ) : (
                        "Publicar Post"
                      )}
                    </Button>
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